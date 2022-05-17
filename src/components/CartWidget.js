import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { CartContext } from './CartContext';


 const CartWidget = () => {

    const {cartQty}=useContext(CartContext);
    
  return (
      <>
      <Link to='/cart'>
      <Badge badgeContent={cartQty()} color="secondary">
          <ShoppingCartOutlined className='text-white' />
       </Badge>
       </Link>
      </>
  )
}
export default CartWidget;