
import { useEffect, useState } from "react";


 const ItemCount = ({   stock = 0, initial = 1, onAdd  }) => {
    const [count, setCount] = useState(0);
  

    useEffect(() => {
      setCount(initial)
    }, []);

    const increment = () => {
        if(count < stock){ setCount(count+1)} ;
    }
    
    const decrement = () => {
        if(count > initial ) { setCount(count-1) };
    }

    const handleAdd = () => {
        stock && onAdd(count) ;
    }

  return (
     <> 
     
    <div className="flex items-center	 ">
    <button className="btn btn-blue" onClick={increment}> + </button>
    <p> {count}</p>
    <button className="btn btn-blue"onClick={decrement}> - </button>
    </div>
    <button className="btn btn-blue" onClick={handleAdd}>
        Agregar al Carrito
    </button>
    </>
    
  )
}

export default ItemCount; 