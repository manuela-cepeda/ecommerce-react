
import { useEffect, useState } from "react";


 const ItemCount = ({ stock, initial, onAdd  }) => {

    const [count, setCount] = useState(0);    

    useEffect(() => {
      setCount(initial)
    }, []);

    const increment = (e) => {
      e.preventDefault();
        if(count < stock){ setCount(count+1)} ;
    }
    
    const decrement = (e) => {
      e.preventDefault();
        if(count > initial ) { setCount(count-1) };
    }

    const handleAdd = (e) => {
        e.preventDefault();
        stock && onAdd(count) ;
    }

  return (
     <> 
     
    <div className="flex items-center	 ">
    <button className="btn btn-gray" onClick={increment}> + </button>
    <p> {count}</p>
    <button className="btn btn-gray" onClick={decrement}> - </button>
    </div>
    <button className="btn btn-gray" onClick={handleAdd}>
        Agregar al Carrito
    </button>
    </>
    
  )
}

export default ItemCount; 