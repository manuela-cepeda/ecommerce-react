import { Link } from 'react-router-dom';
import {ExitToAppOutlined } from '@material-ui/icons';
import { useContext } from "react";
import { AuthContext } from './AuthContext';


 const LogoutWidget = () => {
    const {  handleLogout } = useContext(AuthContext);

    const onLogout = () => {
        handleLogout()

    }
    
  return (
      <>
      <Link to='/login'  onClick={onLogout} > 
          <ExitToAppOutlined className='text-white ml-4' />
        </Link>
      </>
  )
}
export default LogoutWidget;