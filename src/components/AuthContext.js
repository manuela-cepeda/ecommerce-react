import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => { 

       
    const [user, setUser] = useState(null) 
    
    
    const handleLogin =  () => {
        const user = JSON.parse(localStorage.getItem('session')) 
        setUser(user);
      };
    
      const handleLogout = () => {
        localStorage.setItem('session',null);
        setUser(null);
    };



    return(
        <AuthContext.Provider value={{
            user,
            handleLogin,
            handleLogout
          
            }}>
            {children}
        </AuthContext.Provider>
    );

 }

 export default AuthContextProvider;