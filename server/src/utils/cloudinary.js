import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

export const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    const res = await cloudinary.uploader.upload(filePath, {
      upload_preset: "dev_setups",
      resource_type: "auto",
    });
    console.log("file uploaded to Cloudinary");
    // fs.unlinkSync(filePath);
    return res;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log(error);
    return null;
  }
};
