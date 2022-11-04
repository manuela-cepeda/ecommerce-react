import { useContext, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { AuthContext } from "./AuthContext";


export default function Login() {

  let navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);


  const [formState, setFormState] = useState({
    password:'',
    email:''
})

const {password, email} = formState;

const handleInputChange = ({target}) => {
   
    setFormState({
        ...formState,
        [target.name]: target.value
    })
}

  const handleSubmit = async (e) => {
    e.preventDefault()
   
     const response = await  fetch('http://localhost:8080/api/sessions/login',{
        method: 'POST',
        body: JSON.stringify(formState),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(result=> result.json())
    console.log(response)
    localStorage.setItem('session',JSON.stringify(response.payload));
    handleLogin()

    if(response.success) navigate('/');

}

    return (
      <>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
           
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
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
  
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
  
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
          </div>
        </div>
      </>
    )
  }