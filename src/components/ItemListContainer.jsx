import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import NewProduct from "./NewProduct";
import { AuthContext } from "./AuthContext";


const ItemListContainer = () => {

  const [datos, setDatos] = useState([]);
  const {idCategory} = useParams();
  const { user} = useContext(AuthContext );

  useEffect(() => {         
      console.log(process.env.REACT_APP_API_BASE_URL)
      fetch((idCategory === undefined) ? `${process.env.REACT_APP_API_BASE_URL}/api/products` : `${process.env.REACT_APP_API_BASE_URL}/api/products/category/${idCategory}` )
      .then(result=> result.json())
      .then(json => setDatos(json) )
      .catch(err => console.log(err))


}, [idCategory]);

  return (
    <>    
      <ItemList products = {datos} />¨
      {/* {user?.role === 'admin' &&
         <NewProduct />
      }   */}
     
    </>
  )
}

export default ItemListContainer;