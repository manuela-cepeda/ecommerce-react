import Item from "./Item";


  
   const ItemList = ({products}) => {
    return (
     
          
  
          <div className=" p-10  grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Item key={product.id} product={product} />
            ))}
          </div>
   
    )
  }
  
  export default ItemList;