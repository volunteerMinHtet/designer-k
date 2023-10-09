import fs from "fs";
import { fileURLToPath } from "url";

function retrieveShowCaseImagesFiles() {
  return fs.readdirSync("img/projects");
}

export function getShowCaseImagesUrl(baseServerUrl) {
  const fileNames = retrieveShowCaseImagesFiles();
  const showCaseImageUrls = fileNames.map(
    (fileName) => `${baseServerUrl}/img/projects/${fileName}`
  );
  return showCaseImageUrls;
}
