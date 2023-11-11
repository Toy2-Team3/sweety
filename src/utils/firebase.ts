import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase.config";

export async function UploadImage({
  imageName,
  file,
}: {
  imageName: string;
  file: File;
}): Promise<void> {
  const storageRef = ref(storage, "userProfile/" + imageName);

  try {
    await uploadBytes(storageRef, file);
    console.log("Uploaded a blob or file!");
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

export async function getImageDownloadURL(imageName: string): Promise<string> {
  const storageRef = ref(storage, "userProfile/" + imageName);

  try {
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error getting download URL:", error);
    return "";
  }
}
