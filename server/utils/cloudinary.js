const cloudinary = require("cloudinary").v2;
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//Delete File from Cloudinary

const deleteImageFromCloudinary= async(url) =>{
  const publicId=extractPublicIdFromUrl(url);
  return await cloudinary.uploader.destroy(publicId);
}

//Extract Public Id from URL

// const extractPublicIdFromUrl= (url)=>{
//   const urlParts=url.split('/');
//   const fileWithExtension=urlParts[urlParts.length-1];
//   const publicId=fileWithExtension.split('.')[0];
//   return urlParts.slice(-3).join('/').split('.')[0];
// }

const extractPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const publicIdWithExtension = parts.slice(-2).join("/"); // Hosteleats/hftpfoi0dp1gnzenxpej.jpg
  const publicId = publicIdWithExtension.split(".").slice(0, -1).join("."); // Hosteleats/hftpfoi0dp1gnzenxpej
  return publicId;
};
// Export the function
module.exports = {
  isFileTypeSupported,
  uploadFileToCloudinary,
  deleteImageFromCloudinary,
  extractPublicIdFromUrl,
};
