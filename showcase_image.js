const fs = require("fs");

function retrieveShowCaseImagesFiles() {
  return fs.readdirSync("public/img/projects");
}

function getShowCaseImagesUrl(baseServerUrl) {
  const fileNames = retrieveShowCaseImagesFiles();
  const showCaseImageUrls = fileNames.map(
    (fileName) => `${baseServerUrl}/img/projects/${fileName}`
  );
  return showCaseImageUrls;
}

module.exports = {
  getShowCaseImagesUrl,
};
