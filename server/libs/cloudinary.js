import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dtyehxt51",
  api_key: "115621867251468",
  api_secret: "hpvzH8vI3DFSwMItiUQ6v5kOcDQ",
});

export const uploadCloudinary = async (file) => {
  if (!file) {
    return "Please select a file to upload";
  }
  const result = await cloudinary.uploader.upload(
    file,
    { public_id: file.filename },
    function (error, result) {
      console.log(result);
      return result;
    }
  );
  if (result) {
    fs.unlink(file, (err) => {
      if (err) {
        console.error("Error deleting file from multer destination:", err);
      } else {
        console.log("File deleted successfully from multer destination");
      }
    });
  }
  return result;
};

export const deleteFromClodinary = async (public_id) => {
  if (!public_id) {
    return "Please provide public_id";
  }
  let result = await cloudinary.uploader.destroy(public_id);
  if (result) {
    return result;
  }
};
