import { UserData } from "../constants/constant";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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
const db = getFirestore(app);

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
    console.log("이미지를 업로드 했습니다.");
  } catch (error) {
    console.error("업로드에 실패 했습니다 :", error);
  }
}

export async function getImageDownloadURL(imageName: string): Promise<string> {
  const storageRef = ref(storage, "userProfile/" + imageName);
  try {
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("이미지 url을 다운받을 수 없습니다 :", error);
    return "";
  }
}

export async function deleteImage(imageName: string): Promise<void> {
  const storagePath = "userProfile/" + imageName;
  const imageRef = ref(storage, storagePath);

  try {
    await deleteObject(imageRef);
    console.log("이미지를 지웠습니다.");
  } catch (error) {
    console.error("이미지를 지우지 못했습니다 :", error);
  }
}

export async function addUserData(userData: UserData): Promise<void> {
  const userDocRef = doc(db, "user", userData.userId);

  try {
    await setDoc(userDocRef, userData);
    console.log("유저 데이터를 업로드 했습니다");
  } catch (error) {
    console.error("유저 데이터 업로드에 실패했습니다 : ", error);
    throw error;
  }
}
