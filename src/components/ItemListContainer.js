import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customFetch from "../utils/customFetch";
import ItemList from "./ItemList";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import db from "../utils/firebaseConfig";

const { products } = require('../utils/datos');


const ItemListContainer = () => {

  const [datos, setDatos] = useState([]);
  const {idCategory} = useParams();
 
  useEffect(() => {

    const firestoreFetch = async () => { 

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
     
     firestoreFetch()
        .then(result => setDatos(result))
        .catch(err => console.log(err))
}, [idCategory]);


  return (
    <>
    
      <ItemList products = {datos} />
    </>
  )
}

export default ItemListContainer;