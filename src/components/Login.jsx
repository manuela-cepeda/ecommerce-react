import { useContext, useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Login() {

  // const { handleLogin, setIsLogged, isLogged } = useContext(AuthContext);
  let navigate = useNavigate();
  const [formState, setFormState] = useState({password:'', email:''} )

  const {password, email} = formState;    
  useEffect(() => {
    const isAuth = async () => {
     const  response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/sessions/isUserAuth`,{    
        headers: { "x-access-token": localStorage.getItem('session')}
    }).then(result=> result.json())

    if(response.auth)  navigate('/')
    }
     isAuth()

  }, [])

const handleInputChange = ({target}) => {
    setFormState({
        ...formState,
        [target.name]: target.value
    })
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/sessions/login`,{
      method: 'POST',
      body: JSON.stringify(formState),
      headers: {
          "Content-Type": "application/json"
      }
    }).then(result=> result.json())
    if(!response.success){alert('hubo un problema con el login, intentelo nuevamente')}
    
    localStorage.setItem('session', response.token);
    if(response.success) navigate('/');

}

  const handleSubmitGoogle = async (e) => {
    e.preventDefault()
     window.open(`${process.env.REACT_APP_API_BASE_URL}/api/sessions/google`, '_self')
  }

    return (
      <>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
             <h1 className=" text-center text-3xl  text-gray-900  tracking-tight "  ><span className="font-bold">ECO</span>TIENDA </h1>
              <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <Link to={`/register`}   className="font-medium  text-slate-600 hover:text-slate-500">
                  Register
                  </Link> 
              </p>
            </div>
            <form  onSubmit = {handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded mb-3   border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                    value = {email}
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded mb-3   border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    value = {password}
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
  
              <div className="flex items-center justify-end">
  
                <div className="text-sm">
                  <a href="#" className="font-medium  text-slate-600 hover:text-slate-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4  w-full  btn-gray"

                >
                  Sign in
                </button>
              </div>
            </form>
            <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
               >
            <p className="text-center text-sm text-gray-600 mx-4 mb-0">Or</p>
          </div>
          <div>
          <button 
             onClick={handleSubmitGoogle}
            className="group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4  w-full  btn-gray"
          > 
          <img src={require('../assets/Google-logo.png')} alt="Google Logo" className="w-5 h-5 mx-2"/>
            Continue with Google
          </button>
        </div>
              
          </div>
        </div>
      </>
    )
  }