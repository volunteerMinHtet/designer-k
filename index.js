const express = require("express");
const fs = require("fs");
const { getShowCaseImagesUrl } = require("./showcase_image.js");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 8010;
const app = express();

const username = "htuthtut";
const password = "12345678";

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  session({
    is_authenticated: false,
    error_msg: null,
    secret: "super_secret",
    saveUninitialized: true,
    cookie: { secure: false },
    resave: false,
  })
);

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", (req, res) => {
  if (req.body?.username == username && req.body?.password == password) {
    req.session.is_authenticated = true;
    req.session.save();
  } else {
    res.redirect("back");
  }

  res.redirect("/show-case-images");
});

app.get("/api/show-case-images", (req, res) => {
  const data = getShowCaseImagesUrl(`${req.protocol}://${req.headers.host}`);
  res.json(data);
});

app.get("/add-show-case-image", (req, res) => {
  if (req.session.is_authenticated) {
    res.sendFile(path.join(__dirname, "views", "add-show-case-image.html"));
  } else {
    res.redirect("/login");
  }
});

app.get("/show-case-images", (req, res) => {
  if (req.session.is_authenticated) {
    res.sendFile(path.join(__dirname, "views", "show-case-images.html"));
  } else {
    res.redirect("/login");
  }
});

app.post("/upload-show-case-image", (req, res) => {
  const fileName = req.body?.file_name;
  const image = req?.files.image;

  if (fileName && image) {
    const verifiedFileName = fileName.split(".")[0];
    const fileNameArray = image.name.split(".");
    const fileExt = fileNameArray[fileNameArray.length - 1];
    image.mv(
      path.join(
        __dirname,
        "public/img/projects",
        `${verifiedFileName}.${fileExt}`
      )
    );

    req.session.error_msg = null;
    req.session.save();
  } else {
    req.session.error_msg = "Both file name and image file are required. :)";
    req.session.save();
  }

  res.redirect("back");
});

app.post("/delete-show-case-image/:imageName", (req, res) => {
  const deleteImageName = req.params.imageName;
  try {
    fs.rmSync(path.join(__dirname, "public/img/projects", deleteImageName));
  } catch (error) {
    req.session.error_msg = `Failed to remove image (${req.params.imageName}) :)`;
    req.session.save();
    return res.redirect("back");
  }

  req.session.error_msg = null;
  req.session.save();

  res.redirect("/show-case-images");
});

app.get("/api/error-message", (req, res) => {
  const sessionErrorMsg = req.session.error_msg || null;
  res.json({ error_msg: sessionErrorMsg });
});

app.get("/test", (req, res) =>
  res.json({
    PORT: PORT,
    PARENT_DIR: fs.readdirSync("../"),
    PROJECT_DIR: fs.readdirSync("./", { withFileTypes: true }).map((item) => {
      if (item.isDirectory()) {
        return {
          [item.name]: fs
            .readdirSync(item.name, { withFileTypes: true })
            .map((item) => item.name),
        };
      } else {
        return item.name;
      }
    }),
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("Running app...");
});
