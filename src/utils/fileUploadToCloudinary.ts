import { v2 as cloudinary } from "cloudinary";

interface IFileUploadToCloudinary {
  file: Express.Multer.File;
  folder?: string;
}

const fileUploadToCloudinary = async ({
  file,
  folder = "youtube-clone-mern",
}: IFileUploadToCloudinary) => {
  try {
    const b64 = file.buffer.toString("base64");
    const imgURI = `data:${file.mimetype};base64,${b64}`;

    const res = await cloudinary.uploader.upload(imgURI, {
      folder,
      resource_type: "auto",
    });

    return res;
  } catch (error) {
    console.error("Failed to upload file to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

export default fileUploadToCloudinary;
