import fs from "fs";

function retrieveShowCaseImagesFiles() {
  return fs.readdirSync("public/img/projects");
}

export function getShowCaseImagesUrl(baseServerUrl) {
  const fileNames = retrieveShowCaseImagesFiles();
  const showCaseImageUrls = fileNames.map(
    (fileName) => `${baseServerUrl}/public/img/projects/${fileName}`
  );
  return showCaseImageUrls;
}
