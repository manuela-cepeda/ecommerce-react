import { Link } from "react-router-dom"

const ButtonCart = () => {
  return (
    <Link to='/cart'>
         <button className="btn btn-blue" >
        Ir al Carrito
        </button>
     </Link>
  )
}

export default ButtonCart