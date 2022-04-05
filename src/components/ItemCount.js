
import { useEffect, useState } from "react";


 const ItemCount = ({   stock = 0, initial = 1  }) => {
    const [count, setCount] = useState(0);
  

    useEffect(() => {
      setCount(initial)
    }, []);

    const increment = () => {
        if(count < stock){ setCount(count+1)} ;
    }
    
    const decrement = () => {
        if(count > 0) { setCount(count-1) };
    }

  return (
     <> 
     
    <div className="flex items-center	 ">
    <button className="btn btn-blue" onClick={increment}> + </button>
    <p> {count}</p>
    <button className="btn btn-blue"onClick={decrement}> - </button>
    </div>
    <button className="btn btn-blue">
        Agregar al Carrito
    </button>
    </>
    
  )
}

export default ItemCount; 