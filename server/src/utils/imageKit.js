import imageToBase64 from "image-to-base64";
import ImageKit from "imagekit";
import fs from "fs";

export const uploadOnImageKit = async (file, fileName) => {
  try {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });

    const base64Image = await imageToBase64(file);
    const response = await imagekit.upload({
      file: base64Image,
      fileName,
      folder: "/avatars",
      transformation: {
        post: [
          {
            type: "transformation",
            value: "w-100,h-100",
          },
        ],
      },
    });
    fs.unlinkSync(file);
    console.log("file uploaded successfully");
    return response;
  } catch (error) {
    fs.unlinkSync(file);
    console.log(error);
  }
};
