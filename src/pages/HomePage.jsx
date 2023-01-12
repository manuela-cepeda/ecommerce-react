
import { useContext, useEffect } from 'react';
import {  Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import Chat from '../components/Chat';
import NavBar from '../components/NavBar';

function HomePage() {

  const {handleLogin } = useContext(AuthContext);
  const navigate = useNavigate() 
  
  useEffect(() => {
    const cookie = document.cookie.split('; ').find((row) => row.startsWith('cOokieCoDer='))?.split('=')[1];
    const isAuth = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/sessions/isUserAuth`,{    
         headers: {"x-access-token": (cookie || localStorage.getItem('session'))}
     }).then(result=> result.json())
   
      if(response.auth) {
        handleLogin(response.user)
        cookie && localStorage.setItem('session', cookie);
      }
      if(!response.auth) navigate('/login')
     }
    isAuth()
   
  },[])


  return (
    <> 
      <NavBar />
      <Outlet /> 
       <Chat /> 
      
    </>
  
    )
  }



export default HomePage;
