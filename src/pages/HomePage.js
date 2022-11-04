
import { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import NavBar from '../components/NavBar';

function HomePage() {

  const { user } = useContext(AuthContext);




  if (!user ) {
    return <Navigate to="/login" replace />;
  } 
    return (
      <> 
           
        <NavBar />
        <Outlet /> 
        </>
    
      )
  }



export default HomePage;
