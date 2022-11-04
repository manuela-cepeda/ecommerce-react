import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestoreFetchItem } from "../utils/firestoreFetch";
import ItemDetails from "./ItemDetails";

const ItemDetailContainer = () => {

    const [item, setItem] = useState([]);
    const {idItem} = useParams();

    useEffect(() => {
      fetch(`http://localhost:8080/api/products/${idItem}`)
      .then(result=> result.json())
      .then(json => setItem(json) )
      .catch(err => console.log(err))
     
  }, [idItem]);
  


  return (
    <>
        <ItemDetails product= {item} />
    </>
  )
}

export default ItemDetailContainer;