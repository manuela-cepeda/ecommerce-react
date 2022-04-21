import React, { useContext } from 'react'
import { CartContext } from './CartContext'
import { Link } from "react-router-dom";


export const Cart = () => {

  const {cartList, deleteCart, deleteItem}=useContext(CartContext)

  return (
    <>
     <h2 className="text-2xl m-2 font-extrabold text-gray-900">Tu Carrito</h2>
    {cartList?.map((product) => (
      <div key={product.id} className=" py-10 px-4" > 
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
        {product.price}
        </div>
        <div className="w-full flex-none text-sm font-medium text-slate-700 my-2">
        {product.stock ? ' en stock' : 'sin stock'} 
        </div>
      </div>
     
      <div className=" mb-6 text-sm font-medium  ">
        {product.cant} items
      <button className="btn btn-blue" onClick={()=>{deleteItem(product.id)}}  >
          Borrar
        </button>
      </div>
      <p className="text-sm text-slate-700">
        Envio Gratis a todo el país. 
      </p>
    </form>
    </div>
    </div>

    ))}

    <div className=" flex justify-center mb-6 text-sm font-medium ">
    <Link to='/' className="btn flex-none flex items-center justify-center btn text-slate-600 border border-slate-600" >
    <span aria-hidden="true"> &larr;</span>
          Continuar comprando  
        </Link> 
      <button className="btn btn-blue" onClick={deleteCart}  >
         Borrar todo 
        </button>
      </div>
    </>
   
  )
}
