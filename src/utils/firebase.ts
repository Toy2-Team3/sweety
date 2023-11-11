import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

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
