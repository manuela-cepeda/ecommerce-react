import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customFetch from "../utils/customFetch";
import ItemDetails from "./ItemDetails";
const { products } = require('../utils/datos');

const ItemDetailContainer = () => {

    const [dato, setDato] = useState([]);
    const {idItem} = useParams();

    useEffect(() => {
      customFetch(2000, products[parseInt(idItem)-1])
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