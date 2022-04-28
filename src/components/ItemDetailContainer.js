import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../utils/firebaseConfig";
import ItemDetails from "./ItemDetails";

const ItemDetailContainer = () => {

    const [dato, setDato] = useState([]);
    const {idItem} = useParams();

    useEffect(() => {
        console.log(idItem)
      const firestoreFetch = async (idItem) => { 
        console.log(idItem)
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

       firestoreFetch(idItem)
          .then(result => setDato(result))
          .catch(err => console.log(err))
  }, [idItem]);
  


  return (
    <>
        <ItemDetails product= {dato} />
    </>
  )
}

export default ItemDetailContainer