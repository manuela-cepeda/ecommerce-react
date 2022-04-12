import { useEffect, useState } from "react";
import customFetch from "../utils/customFetch";
import ItemDetails from "./ItemDetails";
const { products } = require('../utils/datos');

const ItemDetailContainer = () => {

    const [dato, setDato] = useState([]);

   console.log(dato)
    useEffect(() => {
      customFetch(2000, products[1])
          .then(result => setDato(result))
          .catch(err => console.log(err))
  }, []);
  


  return (
    <>
        <ItemDetails product= {dato} />
    </>
  )
}

export default ItemDetailContainer