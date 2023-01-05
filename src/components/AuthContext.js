import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => { 

       
    const [user, setUser] = useState( null ) 
    const [isLogged, setIsLogged] = useState(user ? true : false)
    
    const handleLogin =  (user) => {
        setUser(user);
        setIsLogged(true)
      };
    
      const handleLogout = () => {
        localStorage.setItem('session',null);
        setUser(null);
        setIsLogged(false)
    };



    return(
        <AuthContext.Provider value={{
            isLogged,
            user,
            handleLogin,
            handleLogout
            }}>
            {children}
        </AuthContext.Provider>
    );

 }

 export default AuthContextProvider;