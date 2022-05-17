import { collection, getDocs, orderBy, query, where, doc, getDoc } from "firebase/firestore";
import db from "../utils/firebaseConfig";

export const firestoreFetchItems = async (idCategory) => { 
    let q;
    if ((idCategory === undefined)) {
      q = query(collection(db, "products"), orderBy('name'));         
    } else {
      q = query(collection(db, "products"), where('category', '==', parseInt(idCategory)));
    }

    const querySnapshot = await getDocs(q);    
    const dataFromFirestore =querySnapshot.docs.map((doc) => ({
      id: doc.id, 
      ...doc.data()
    }));    
    return dataFromFirestore
}

export const firestoreFetchItem = async (idItem) => {         
    const docRef = doc(db, "products", idItem);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {     
       return {
          id: idItem,
          ...docSnap.data()
      } 
    } else {         
      console.log("No such document!");
    }
  } 


  