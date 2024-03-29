import Item from "./Item";


  
   const ItemList = ({products}) => {
    return (
     <>
            {products ?
          <div className=" p-10  grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Item key={product._id} product={product} />
            ))}
          </div>
           :
           <p>Cargando... </p>
           }
          </>
    )
  }
  
  export default ItemList;