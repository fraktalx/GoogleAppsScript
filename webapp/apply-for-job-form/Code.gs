/* The script is deployed as a web app and renders the form */
function doGet(e) {
  return HtmlService
  .createHtmlOutputFromFile('Form')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle("SET-YOUR-PAGE-TITLE");
}

function uploadFileToGoogleDrive(data, file, name, email) {

  try {

    var dropbox = ""; //ENTER YOUR DRIVE FOLDER NAME HERE
    var folder, folders = DriveApp.getFoldersByName(dropbox);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox);
    }

    var contentType = data.substring(5,data.indexOf(';')),
        bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7)),
        blob = Utilities.newBlob(bytes, contentType, file);

    folder.createFolder([name, email].join(" ")).createFile(blob);

    return "OK";

  } catch (f) {
    return f.toString();
  }

}
