import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from './CartContext'
import { Link } from "react-router-dom";
import { AuthContext } from './AuthContext';



export const Cart = () => {

  const {cartList, deleteCart, deleteItem, calcSubtotal, calcTaxes, calcTotal}=useContext(CartContext)
  const {user }=useContext(AuthContext)
  
  console.log(cartList)
  
  const handleCheckout =  () => {
    //update product stock !!!
    cartList.forEach(async (item) => {   
      const updatedProduct = { stock: item.stock - item.qty }
  
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products/${item._id}`,{
      method: 'PUT',
      body: JSON.stringify(updatedProduct),
      headers: {
          "Content-Type": "application/json"
      }
    })
    .then(result=> result.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))

    });
    
    let order = {
      buyer: user.email, 
      products: cartList, 
      total: calcTotal()      
    }
  
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders`,{
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
        "Content-Type": "application/json"
    }
  })
  .then(result=> result.json())
  .then(json => console.log(json))
  .catch(err => console.log(err))
    
    
   

    deleteCart()
   }

  return (
    <>
     
     <div className=" flex justify-center my-6 text-sm font-medium ">
    <Link to='/' className="btn flex-none  btn text-slate-600 border border-slate-600" >
    <span aria-hidden="true"> &larr;</span>
          Continuar comprando  
        </Link> 
      {cartList.length > 0 && <button className="btn btn-gray" onClick={deleteCart}  >
         Borrar todo 
        </button>}
      </div>
    
    <div className=' container mx-auto px-4  lg:grid lg:grid-cols-3 lg:gap-2 '> 

    <div className='col-span-2'> 
    <h2 className=" text-2xl m-2 font-extrabold text-gray-900 ">Tu Carrito</h2>
    {cartList.length > 0 
    ?
    cartList?.map((product) => (
      <div key={product._id} className="container mx-auto py-10 px-4" > 
    <div className="flex font-sans">
    <div className="flex-none w-48 relative">
      <img 
      src={product.imageSrc}
      alt={product.imageAlt}
       className="absolute inset-0 w-full h-full object-cover" />
    </div>
    <form className="flex-auto p-6">
      <div className="flex flex-wrap">
        <h1 className="flex-auto text-lg font-semibold text-slate-900">
        {product.name}
        </h1>
        <div className="text-lg font-semibold text-slate-500">
        $ {product.price * product.qty}
        </div>
        <div className="w-full flex-none text-sm font-medium text-slate-700 my-1">
        {product.stock ? ' en stock' : 'sin stock'} 
        </div>
        <div className="w-full flex-none text-sm font-medium text-slate-700 my-1">
        {product.qty} items 
        </div>
        <div className="w-full flex-none text-sm font-medium text-slate-700 my-1">
        $ {product.price}
        </div>
      </div>
     
      <div className="-mx-2 mb-2 text-sm font-medium  ">
               
        <button className="btn btn-gray" onClick={()=>{deleteItem(product._id)}}  >
          Borrar
        </button>
      </div>
      <p className="  text-xs text-slate-700">
        Envio Gratis a todo el país. 
      </p>
    </form>
    </div>
    </div>    
    ))
    :  <p className='container mx-auto py-10 px-4 '>Tu carrito esta vacio</p>
    }
    
    </div>

    {cartList.length > 0 &&
        <div className='p-2 h-fit bg-gray-100 rounded' >
    <div className="border-b border-gray-200 py-6 px-4 flex justify-between text-base font-medium text-gray-900">
      <p>Subtotal</p>
      <p>$ {calcSubtotal()}</p>
    </div>
    <div className="border-b border-gray-200 py-6 px-4 flex justify-between text-base font-medium text-gray-900">
      <p>Impuestos</p>
      <p>$ {calcTaxes()}</p>
    </div>
    <div className="border-b border-gray-200 py-6 px-4 flex justify-between text-base font-medium text-gray-900">
      <p>Envio</p>
      <p>-</p>
    </div>
    <div className="font-bold py-6 px-4 flex justify-between text-base font-medium text-gray-900">
      <p>Total</p>
      <p>$ {calcTotal()}</p>
    </div>
 
    <button className=' w-full btn btn-gray'
    onClick={handleCheckout}
    >
   Finalizar mi compra
  </button>

    </div>
    }
    </div>
   
    </>
   
  )
}
