const cloudinary = require("cloudinary").v2;
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Export the function
module.exports = {
  isFileTypeSupported,
  uploadFileToCloudinary,
};
