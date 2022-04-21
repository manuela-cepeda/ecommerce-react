
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cart } from './components/Cart';
import { CartContext } from './components/CartContext';
import ItemDetailContainer from './components/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
    <CartContext.Provider value={'hola'}>
    <BrowserRouter > 
    <NavBar />
       <Routes>
        <Route  path='/' element={<ItemListContainer />} />
        <Route  path='/category/:idCategory' element={<ItemListContainer />} />
        <Route  path='/item/:idItem' element={<ItemDetailContainer />} />
        <Route  path='/cart' element={<Cart/>} />
      </Routes>     
    </BrowserRouter>
    </CartContext.Provider>
    </>

  );
}

export default App;
