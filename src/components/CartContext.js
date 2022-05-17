import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({children}) => { 

    const [cartList, setCartList] = useState([])    

    const addToCart = (item, qty) => { 
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
            qty: qty
        }])
        }else{
            found.qty += qty;
            setCartList([
                ...cartList
            ]);
        }
    }

    const deleteCart = () => { 
         setCartList([])
    }

    const deleteItem = (id) => { 
        let result = cartList.filter(item => item.id !== id);
        setCartList(result);
    } 

    const calcSubtotal = () => {
        return cartList.reduce((a, b) => a + (b['price'] * b['qty'] | 0), 0)
    }
    const calcTaxes= () => {
        return calcSubtotal() * 0.21;
    }
    const calcTotal= () => {
        return calcSubtotal() + calcTaxes();
    }


    const  cartQty = () => {    
        return cartList.map(item => item.qty).reduce(((prev, curr) => prev + curr), 0);
     }

    return(
        <CartContext.Provider value={{
            cartList, 
            addToCart,
            deleteCart, 
            deleteItem,
            cartQty,
            calcSubtotal,
            calcTaxes,
            calcTotal
            }}>
            {children}
        </CartContext.Provider>
    );

 }

 export default CartContextProvider;