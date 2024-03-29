import { Link } from "react-router-dom";
  
  const Item = ( {product}) => {
    return (
     
    <div key={product._id} className="group relative">
    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
      <Link to={`/item/${product._id}`} > 
        <img
        src={product.imageSrc}
        alt={product.imageAlt}
        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
        </Link>
    </div>
    <div className="mt-4 flex justify-between">
        <div>
        <h3 className="text-sm text-gray-700">
            <Link to={`/item/${product._id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
            </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900"> $ {product.price}</p>
    </div>
    </div>
    )      
  }
  
  export default Item;