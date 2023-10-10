import express from "express";
import path from "path";
import { ___dirname } from "./helper.js";
import { getShowCaseImagesUrl } from "./showcase_image.js";

const PORT = process.env.PORT || 8010;
const app = express();

app.use("/css", express.static(path.join(___dirname, "css")));
app.use("/js", express.static(path.join(___dirname, "js")));
app.use("/img", express.static(path.join(___dirname, "img")));
app.use("/fontawesome", express.static(path.join(___dirname, "fontawesome")));

app.use((req, res, next) => {
  console.log("log from app middleware");
  console.log("header", req.headers);
  console.log("app", (app._router.stack));
  console.log("URL", `${req.protocol}://${req.headers.host}${req.url}`);
  //   console.log("res", res);
  //   console.log("next", next);
  //   console.error(err);
  //   console.error(err.stack);

  //   if (err) return res.status(500).send("Something went wrong!");

  return next();
});

app.get("/show-case-images", (req, res) => {
  const data = getShowCaseImagesUrl(`${req.protocol}://${req.headers.host}`);
  res.json(data);
});

app.get("/", (req, res) => {
  res.sendFile(___dirname + "/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(___dirname + "/about.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(___dirname + "/contact.html");
});

app.get("/add-show-case-image", (req, res) => {
  res.redirect();
});

app.listen(PORT, () => {
  console.log("Running app...");
});
