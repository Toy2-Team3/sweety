import {
  doc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "./firebase.config";

export interface UserData {
  id: string;
  userId?: string;
  password?: string;
  token?: string;
  nickName?: string;
  birth?: string;
  gender?: string;
  region?: string;
  profileUrl?: string;
  myChats?: string[];
  introduction?: string;
  interested?: string[];
  status?: string;
  alcohol?: string;
  smoking?: boolean;
  mbti?: string;
  job?: string;
  tall?: number;
}

export interface CommunityData {
  id: string;
  chatId?: string;
  userId?: string;
  title?: string;
  content?: string;
}

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

//모든 문서 읽기
export const getAllData = async (
  collectionName: string,
): Promise<UserData[] | CommunityData[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const docs = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
  return docs;
};

//단일 문서 읽기
export const getSingleData = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      ...docSnap.data(),
      id: docSnap.data().id as string,
    };
  }
};

//유저 데이터 추가
export const setUserData = async (
  userId: string,
  props: UserData,
): Promise<void> => {
  const docRef = doc(db, "user", userId);

  await setDoc(docRef, props);
};

//커뮤니티 데이터 추가
export const setCommunityData = async (props: CommunityData): Promise<void> => {
  const newRef = doc(collection(db, "community")); //자동 랜덤 id

  await setDoc(newRef, props);
};

//업데이트
export const updateData = async (
  collectionName: string,
  docId: string,
  props: Omit<UserData | CommunityData, "id">,
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);

  await updateDoc(docRef, props);
};

//삭제
export const deleteData = async (
  collectionName: string,
  docId: string,
): Promise<void> => {
  await deleteDoc(doc(db, collectionName, docId));
};

//이미지 추가
export const addImage = (imageName: string, image: File) => {
  return new Promise<string | undefined>((resolve, reject) => {
    const imageRef = ref(storage, `userProfile/${imageName}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on(
      "state_changed",
      null,
      (error) => reject(error),
      async () => {
        try {
          const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(imageURL);
        } catch (error) {
          reject(error);
        }
      },
    );
  });
};

export const get = async (
  initialCollection: string,
  key = null as string | null,
  value = null as string | null,
): Promise<UserData[] | []> => {
  try {
    if (key) {
      const Ref = collection(db, initialCollection);
      const q = query(Ref, where(key, "==", value));
      const querySnapshot = await getDocs(q);
      const userData: UserData[] = [];

      querySnapshot.forEach((doc) => {
        userData.push({
          ...(doc.data() as UserData),
          id: doc.id,
        });
      });

      console.log("good");
      return userData;
    } else {
      const Ref = collection(db, initialCollection);
      const userData: UserData[] = [];
      const querySnapshot = await getDocs(Ref);

      querySnapshot.forEach((doc) => {
        userData.push({
          ...(doc.data() as UserData),
          id: doc.id,
        });
      });

      console.log("good");
      return userData;
    }
  } catch (error) {
    console.error("bad: ", error);
    return []; // Handle errors appropriately
  }
};
