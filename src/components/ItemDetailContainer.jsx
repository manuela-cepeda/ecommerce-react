import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetails from "./ItemDetails";

const ItemDetailContainer = () => {

    const [item, setItem] = useState([]);
    const {idItem} = useParams();

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products/${idItem}`)
      .then(response=> {
        if(response.ok){
          return response.json()
        } else{
          return Promise.reject(response);
        }
      })
      .then(json => setItem(json) )
      .catch(response => {        
        response.json().then((json) => {
          alert(json.error);
          window.history.back();
        })
      })
     
  }, [idItem]);
  

  return (
    <>
        <ItemDetails product= {item} />
    </>
  )
}

export default ItemDetailContainer;