import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { firestoreFetchItems } from "../utils/firestoreFetch";


const ItemListContainer = () => {

  const [datos, setDatos] = useState([]);
  const {idCategory} = useParams();
 
  useEffect(() => {         
    firestoreFetchItems(idCategory)
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