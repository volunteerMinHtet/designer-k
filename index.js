const express = require("express");
const fs = require("fs");
const { getShowCaseImagesUrl } = require("./showcase_image.js");
const path = require("path");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8010;
const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/api/show-case-images", (req, res) => {
  const data = getShowCaseImagesUrl(`${req.protocol}://${req.headers.host}`);
  res.json(data);
});

app.get("/add-show-case-image", (req, res) => {
  //   res.redirect();
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
