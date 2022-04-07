import { useEffect, useState } from "react";
import customFetch from "../utils/customFetch";
import ItemCount from "./ItemCount";
import ItemList from "./ItemList";

const { products } = require('../utils/datos');


const ItemListContainer = ({ greeting }) => {

  const [datos, setDatos] = useState([]);
  console.log(datos)
  useEffect(() => {
    customFetch(2000, products)
        .then(result => setDatos(result))
        .catch(err => console.log(err))
}, [datos]);

  const onAdd = (count) => {
    alert(`se agregaron ${count} productos`)
  }
  return (
    <>
      <div>{greeting}</div>
      <ItemList products = {datos} />
      <ItemCount stock={5} initial={1} onAdd={onAdd} />
    </>
  )
}

export default ItemListContainer;