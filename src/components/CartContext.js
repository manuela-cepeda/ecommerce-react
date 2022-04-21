import { createContext, useState } from "react";


export const CartContext = createContext();

const CartContextProvider = ({children}) => { 

    const [cartList, setCartList] = useState([])

    const addToCart = (item, cant) => { 
        let found = cartList.find(product => product.id === item.id);
        if(!found ){
            setCartList([
            ...cartList, 
            {
            id: item.id,
            name: item.name,    
            imageSrc: item.imageSrc,
            imageAlt:  item.imageAlt,   
            price: item.price,
            stock: item.stock,
            cant: cant
        }])
        }else{
            found.cant += cant;
        }
    }

     const deleteCart = () => { 
         setCartList([])
      }

      const deleteItem = (id) => { 
        let result = cartList.filter(item => item.id !== id);
        setCartList(result);
      }   
    return(
        <CartContext.Provider value={{cartList, addToCart, deleteCart, deleteItem}}>
            {children}
        </CartContext.Provider>
    );

 }

 export default CartContextProvider;