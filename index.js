import express from "express";
import fs from "fs";
import { ___dirname } from "./helper.js";
import { getShowCaseImagesUrl } from "./showcase_image.js";

const PORT = process.env.PORT || 8010;
const app = express();

app.use(express.static("public"));

app.get("/show-case-images", (req, res) => {
  const data = getShowCaseImagesUrl(`${req.protocol}://${req.headers.host}`);
  res.json(data);
});

app.get("/", (req, res) => {
  res.sendFile(___dirname + "/public/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(___dirname + "/public/about.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(___dirname + "/public/contact.html");
});

app.get("/add-show-case-image", (req, res) => {
  res.redirect();
});

app.get("/test", (req, res) =>
  //   res.send(`PORT: ${process.env.PORT}\nDIR: ${___dirname}`)
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

app.listen(PORT, () => {
  console.log("Running app...");
});
