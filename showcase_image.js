const fs = require("fs");

function retrieveShowCaseImagesFiles() {
  return fs.readdirSync("public/img/projects");
}

function getShowCaseImagesUrl(baseServerUrl) {
  const fileNames = retrieveShowCaseImagesFiles();
  const showCaseImageUrls = fileNames.map((fileName) => {
    return {
      url: `${baseServerUrl}/public/img/projects/${fileName}`,
      file_name: fileName,
    };
  });
  return showCaseImageUrls;
}

module.exports = {
  getShowCaseImagesUrl,
};
