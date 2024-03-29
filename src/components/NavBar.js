import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import CartWidget from "./CartWidget";
import LogoutWidget from "./LogoutWidget";


const NavBar = () => {
    const {  user } = useContext(AuthContext);

    return (
        <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            
                <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                
                
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                <Link to='/' className="lg:block h-8 w-auto text-lg text-white"  ><span className="font-bold">ECO</span>TIENDA </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                
                    <Link to='/' className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" >Inicio</Link>

                    <Link to='/category/1' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Cosmética</Link>

                    <Link to='/category/2' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Accesorios</Link>

                    <Link to='/category/3' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Zero Waste</Link>
                </div>
                </div>
            </div>
             <p  className=' text-white  px-3 py-2 rounded-md text-sm font-medium py-3 ' >{user?.name}</p>
             <CartWidget  className='py-2' />
             <LogoutWidget  className='py-2'/>
            </div>
        </div>


        <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
            
            <Link to='/' className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Inicio</Link>

            <Link to='/category/1' className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Cosmética</Link>

            <Link to='/category/2' className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Accesorios</Link>


            <Link to='/category/3' className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Zero Waste</Link>
        </div>


  
        
        </div>
        </nav>

    );
  }
  
export default NavBar;