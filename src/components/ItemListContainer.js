import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customFetch from "../utils/customFetch";
import ItemCount from "./ItemCount";
import ItemList from "./ItemList";

const { products } = require('../utils/datos');


const ItemListContainer = () => {

  const [datos, setDatos] = useState([]);
  const {idCategory} = useParams();
 
  useEffect(() => {
    if(idCategory === undefined){
    customFetch(500, products)
        .then(result => setDatos(result))
        .catch(err => console.log(err))
    } else {
      customFetch(500, products.filter(item => item.category === parseInt(idCategory)))
        .then(result => setDatos(result))
        .catch(err => console.log(err))
    }

}, [idCategory]);


  return (
    <>
    
      <ItemList products = {datos} />
    </>
  )
}

export default ItemListContainer;