import {
  doc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebase.config";
import { UserData } from "../constants/constant";

export interface IUserData {
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
  createdAt?: number;
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

export async function updateTokenInUserCollection(
  userId: string,
  newToken: string,
) {
  try {
    const userDocRef = doc(db, "user", userId);

    await updateDoc(userDocRef, {
      token: newToken,
    });

    console.log(`토큰이 성공적으로 업데이트되었습니다.`);
  } catch (error) {
    console.error("토큰 업데이트 중 오류 발생 :", error);
  }
}

//리코일 상태관리 아이디로 사용
export async function getUserData(userId: string) {
  const docRef = doc(db, "user", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function signOut(userId: string) {
  try {
    const userDocRef = doc(db, "user", userId);
    await updateDoc(userDocRef, {
      status: "D",
    });
    console.log(`성공적으로 탈퇴되었습니다.`);
  } catch (error) {
    console.error("탈퇴 중 오류 발생 :", error);
  }
}

//모든 문서 읽기
export const getAllData = async (
  collectionName: string,
): Promise<IUserData[] | CommunityData[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const docs = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
  return docs;
};

//커뮤니티 모든 문서 읽기 (최신순)
export const getAllDataOrderByDate = async (): Promise<CommunityData[]> => {
  const ref = collection(db, "community");
  const q = query(ref, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
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
      // id: docSnap.data().id as string,
    };
  }
};

//유저 데이터 추가
export const setUserData = async (
  userId: string,
  props: IUserData,
): Promise<void> => {
  const docRef = doc(db, "user", userId);

  await setDoc(docRef, props);
};

//커뮤니티 데이터 추가
export const setCommunityData = async (
  props: Omit<CommunityData, "id">,
): Promise<void> => {
  const newRef = doc(collection(db, "community")); //자동 랜덤 id

  await setDoc(newRef, props);
};

//커뮤니티 데이터 업데이트
export const updateData = async (
  docId: string,
  props: Omit<CommunityData, "id">,
): Promise<void> => {
  const docRef = doc(db, "community", docId);

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
  key: keyof IUserData | null = null,
  value: string | null = null,
): Promise<IUserData[]> => {
  try {
    if (key) {
      const Ref = collection(db, initialCollection);
      const q = query(Ref, where(key, "==", value));
      const querySnapshot = await getDocs(q);
      const userData: IUserData[] = [];

      querySnapshot.forEach((doc) => {
        userData.push(doc.data() as IUserData);
      });
      return userData;
    } else {
      const Ref = collection(db, initialCollection);
      const userData: IUserData[] = [];
      const querySnapshot = await getDocs(Ref);

      querySnapshot.forEach((doc) => {
        userData.push(doc.data() as IUserData);
      });
      return userData;
    }
  } catch (error) {
    console.error("bad: ", error);
    throw error;
  }
};
