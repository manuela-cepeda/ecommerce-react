
import {  HashRouter, Route, Routes } from 'react-router-dom';
import CartContextProvider from './components/CartContext';
import HomePage from './pages/HomePage';
import { Cart } from './components/Cart';
import ItemDetailContainer from './components/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer';
import Register from './components/Register';
import Login from './components/Login';
import AuthContextProvider from './components/AuthContext';


function App() {


  return (
    <AuthContextProvider> 
    <CartContextProvider>
    <HashRouter  > 
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
    </HashRouter >
    </CartContextProvider>
    </AuthContextProvider>
    

  )
}

export default App;
