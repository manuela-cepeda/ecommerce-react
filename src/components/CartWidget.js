import { Badge } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';


 const CartWidget = () => {

    const {cartCant}=useContext(CartContext)
  return (
      <>
      <Link to='/cart'>
      <Badge badgeContent={cartCant()} color="secondary">
          <ShoppingCartOutlined className='text-white' />
       </Badge>
       </Link>
      </>
  )
}
export default CartWidget;