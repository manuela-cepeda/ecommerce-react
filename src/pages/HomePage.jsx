
import { useContext, useEffect } from 'react';
import {  Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import Chat from '../components/Chat';
import NavBar from '../components/NavBar';

function HomePage() {

  const {handleLogin } = useContext(AuthContext);
  const navigate = useNavigate() 

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("cookie")
  
  useEffect(() => {
    // const cookie = document.cookie.split('; ').find((row) => row.startsWith('cOokieCoDer='))?.split('=')[1];

    const isAuth = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/sessions/isUserAuth`,{    
         headers: {"x-access-token": (token || localStorage.getItem('session'))}
     }).then(result=> result.json())
      if(response.auth) {
        handleLogin(response.user)
        token && localStorage.setItem('session', token);
        navigate('/')
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
