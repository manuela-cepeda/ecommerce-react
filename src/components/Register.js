import { useContext, useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";


export default function Register({history}) {
  let navigate = useNavigate();
  const {  isLogged } = useContext(AuthContext);

  useEffect(() => {
    if(isLogged) navigate('/')
 }, [isLogged,navigate ])
 

  const [formState, setFormState] = useState({
    password:'',
    email:'',
    name: '',
    lastName:'',
    adress: '',
    age: '',
    tel:''

  })  

  const {password, email, name, lastName, adress, age, tel} = formState;

  const handleInputChange = ({target}) => {
      setFormState({
          ...formState,
          [target.name]: target.value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
     const response = await  fetch('http://localhost:8080/api/sessions/register',{
        method: 'POST',
        body: JSON.stringify(formState),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(result=> result.json())
    
    if(response.success) {
      setTimeout(() => {
        alert('usuario creado')
        navigate('/login');
    }, 500);
    }else{
      alert('no se pudo crear el usuario')
    }

  }

    return (
      <>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
             <h1 className=" text-center text-3xl  text-gray-900  tracking-tight "  ><span className="font-bold">ECO</span>TIENDA </h1>
              <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <Link to={`/login`}   className="font-medium text-slate-600 hover:text-slate-500">
                  Sign in
                  </Link> 
              </p>
            </div>
            <form  onSubmit = {handleSubmit}  className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
              <div>
                  <label htmlFor="name" className="sr-only">
                   Name 
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="relative block w-full appearance-none rounded mb-3  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Name"
                    value = {name}
                    onChange={handleInputChange} 
                  />
                    <label htmlFor="name" className="sr-only">
                   Last Name 
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="lastName"
                    autoComplete="lastName"
                    required
                    className="relative block w-full appearance-none rounded mb-3  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Last Name"
                    value = {lastName}
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label htmlFor="age" className="sr-only">
                   Age 
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="age"
                    autoComplete="age"
                    required
                    className="relative block w-full appearance-none rounded mb-3  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Age"
                    value = {age}
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label htmlFor="adress" className="sr-only">
                   Adress 
                  </label>
                  <input
                    id="adress"
                    name="adress"
                    type="adress"
                    autoComplete="adress"
                    required
                    className="relative block w-full appearance-none rounded mb-3  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Adress"
                    value = {adress}
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label htmlFor="tel" className="sr-only">
                   Phone number 
                  </label>
                  <input
                    id="tel"
                    name="tel"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="relative block w-full appearance-none rounded mb-3  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Phone number"
                    value = {tel}
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded mb-3  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                    className="relative block w-full appearance-none rounded mb-3 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    value = {password}
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
  
  
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4  w-full  btn-gray"
                >
                  
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }