import { Link } from "react-router-dom"

const ButtonCart = () => {
  return (
    <Link to='/cart'>
         <button className="btn btn-gray" >
        Ir al Carrito
        </button>
     </Link>
  )
}

export default ButtonCart