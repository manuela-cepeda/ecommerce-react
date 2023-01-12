import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const CartContextProvider = ({children}) => { 

  const {user} = useContext(AuthContext); 
    const [cartList, setCartList] = useState([])    
    const [cid, setCid] = useState() 

  useEffect(() => {
    if(user){
      const getCart = async ()=>{
        const result =  await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/carts/mycart/${user.id}`)
        .then(response=> response.json())
        .catch(err => console.log(err))
        setCid(result._id)
        if(result.products?.length > 0) {
          const getProduct = async (pid, qty)=>{
            const result =  await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products/${pid}`)
            .then(response=> response.json())
            .catch(err => console.log(err))
            setCartList(cartList => cartList.concat({...result,  qty: qty}))
    
          }
          result.products.forEach(el =>  getProduct(el.pid, el.qty))
        
        }
  
        if(!result._id && user){
          const createCart = async ()=>{
            const result =  await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/carts`,{
              method: 'POST',
              body: JSON.stringify( {buyer: user?.id}),
              headers: { "Content-Type": "application/json" }
            })
            .then(response=> response.json())
            .catch(err => console.log(err))
            console.log(JSON.stringify(result))
            setCid(result._id)
    
          }
          createCart() 
        } 
      
      }
      getCart() 
    }
   
 

  }, [user])


    const addToCart = ( item, qty) => { 
        let found = cartList.find(product => product._id === item._id);
        if(!found ){
            setCartList([
            ...cartList, 
            {
            _id: item._id,
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
        
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/carts/${cid}/products`,{
            method: 'POST',
            body: JSON.stringify([{           
              pid: item._id,    
              qty
            }]),
            headers: {
                "Content-Type": "application/json"
            }
          })
          .then(response=> response.json())      
          .catch(err => console.log(err))
        
          
        }


    const deleteCart = () => { 
         setCartList([])

         fetch(`${process.env.REACT_APP_API_BASE_URL}/api/carts/${cid}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
          })
          .then(response=> response.json())      
          .catch(err => console.log(err))

    }

    const deleteItem = async (id) => { 
        let newCart = cartList.filter(item => item._id !== id);
        setCartList(newCart);
      
       fetch(`${process.env.REACT_APP_API_BASE_URL}/api/carts/${cid}/products/${id}`,{
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json"
          }
        })
        .then(response=> response.json())      
        .catch(err => console.log(err)) 
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
            cid,
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