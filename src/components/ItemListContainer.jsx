import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";



const ItemListContainer = () => {

  const [datos, setDatos] = useState([]);
  const {idCategory} = useParams();
  
  useEffect(() => {         

      fetch((idCategory === undefined) ? `http://localhost:8080/api/products` :  `http://localhost:8080/api/products/category/${idCategory}` )
      .then(result=> result.json())
      .then(json => setDatos(json) )
      .catch(err => console.log(err))


}, [idCategory]);


  return (
    <>    
      <ItemList products = {datos} />
    </>
  )
}

export default ItemListContainer;