
import React, { useState, useEffect } from "react";

const initialState = {
  name:'',
  href:'',
  imageSrc: '',
  imageAlt: '',
  size: '',
  price: '',
  stock: '',
  category: '',
}

function NewProduct() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState( initialState)

  const {name, imageSrc,  size, price, stock, category } = formState;

  const handleInputChange = ({target}) => {
    setFormState({
        ...formState,
        [target.name]: target.value
    })
}


  const handleOpenChat = () => {
    setIsOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products`,{
        method: 'POST',
        body: JSON.stringify(formState),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(result=> result.json())

    console.log(response)
    if(response.success) {
        alert('usuario creado')
        setFormState(initialState)
        setIsOpen(false)
    }else{
      alert('no se pudo crear el usuario')
      setIsOpen(false)
    }
  };

  
  return (
    
    <>
    {!isOpen ?
      <button className="fixed top-14 right-0 m-6 w-10 h-10 bg-gray-800 hover:bg-gray-500 rounded-full p-2" type="button" onClick={handleOpenChat}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
      :
      <div className="fixed top-0 left-0 right-0  w-full p-4 md:inset-0 h-sreen bg-gray-100 bg-opacity-50">
        <div className="flex h-screen justify-center items-center ">
          <div className="relative w-80 h-96 flex flex-col border shadow-md bg-white">
            <div className="flex items-center justify-between border-b p-2">
                Nuevo Producto
              <div>
                <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button" onClick={(e) => setIsOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 px-4 py-4 overflow-y-auto">
            <form  onSubmit = {handleSubmit}   action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
              <div>
                  <label htmlFor="name" className="sr-only">
                   Name 
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="relative block w-full appearance-none rounded mb-3  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Name"
                    value = {name}
                    onChange={handleInputChange} 
                  />
                    <label htmlFor="imageSrc" className="sr-only">
                    URL imagen
                  </label>
                  <input
                    id="imageSrc"
                    name="imageSrc"
                    type="imageSrc"
                    autoComplete="imageSrc"
                    required
                    className="relative block w-full appearance-none rounded mb-3  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="URL imagen"
                    value = {imageSrc}
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label htmlFor="size" className="sr-only">
                  Size
                  </label>
                  <input
                    id="size"
                    name="size"
                    type="size"
                    autoComplete="size"
                    required
                    className="relative block w-full appearance-none rounded mb-3  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Size"
                    value = {size}
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label htmlFor="price" className="sr-only">
                   Price 
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="price"
                    autoComplete="price"
                    required
                    className="relative block w-full appearance-none rounded mb-3  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Price"
                    value = {price}
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label htmlFor="stock" className="sr-only">
                   Stock 
                  </label>
                  <input
                    id="stock"
                    name="stock"
                    type="stock"
                    autoComplete="stock"
                    required
                    className="relative block w-full appearance-none rounded mb-3  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Stock"
                    value = {stock}
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label htmlFor="category" className="sr-only">
                    Categoría
                  </label>
                  <input
                    id="category"
                    name="category"
                    type="category"
                    autoComplete="category"
                    required
                    className="relative block w-full appearance-none rounded mb-3  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Categoría"
                    value = {category}
                    onChange={handleInputChange} 
                  />
                </div>
                
              </div>
  
  
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4  w-full  btn-gray"
                >
                  
                  Crear
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>

    }
  </>

  );
}

export default NewProduct;