// import { collection, query, getDocs, where } from "firebase/firestore";

// import { db } from "../firebase";
// export const useFireFetch = () => {
//   const get = async (initialCollection, key = null, value = null) => {
//     try {
//       if (key) {
//         const Ref = collection(db, initialCollection);
//         const q = query(Ref, where(key, "==", value));
//         const querySnapshot = await getDocs(q);
//         const userData = [];

//         querySnapshot.forEach((doc) => {
//           userData.push(doc.data());
//         });

//         console.log("good");
//         return userData;
//       } else {
//         const Ref = collection(db, initialCollection);
//         const userData = [];
//         const querySnapshot = await getDocs(Ref);

//         querySnapshot.forEach((doc) => {
//           userData.push(doc.data());
//         });

//         console.log("good");
//         return userData;
//       }
//     } catch (error) {
//       console.error("bad: ", error);
//     }
//   };
//   return { get };
// };
