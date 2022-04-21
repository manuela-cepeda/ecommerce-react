import { Badge } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';


 const CartWidget = () => {
  return (
      <>
      <Link to='/cart'>
      <Badge badgeContent={4} color="secondary">
          <ShoppingCartOutlined className='text-white' />
       </Badge>
       </Link>
      </>
  )
}
export default CartWidget;