
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartContextProvider from './components/CartContext';
import HomePage from './pages/HomePage';
import { Cart } from './components/Cart';
import ItemDetailContainer from './components/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer';
import Register from './components/Register';
import Login from './components/Login';
import AuthContextProvider from './components/AuthContext';


function App() {
  //TODO: Get user de sesion?, si no  hay es quetiene que mostrar login
  // y si aprieta fegistrarse mostrar componente register 
  //chequear desafio 12
  return (
    <AuthContextProvider> 
    <CartContextProvider>
    <BrowserRouter > 
       <Routes>
        <Route  path='/' element={<HomePage />} >
          <Route  path='/' element={<ItemListContainer />} />
          <Route  path='/category/:idCategory' element={<ItemListContainer />} />
          <Route  path='/item/:idItem' element={<ItemDetailContainer />} />
          <Route  path='/cart' element={<Cart/>} />
        </Route>
        <Route  path='/login' element={<Login />} />
        <Route  path='/register' element={<Register />} />
        
      </Routes>     
    </BrowserRouter>
    </CartContextProvider>
    </AuthContextProvider>

  )
}

export default App;
