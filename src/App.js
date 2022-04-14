
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer';
import NavBar from './components/NavBar';
// import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <>
    <BrowserRouter > 
    <NavBar />
       <Routes>
        <Route  path='/' element={<ItemListContainer />} />
        <Route  path='/category/:idCategory' element={<ItemListContainer />} />
        <Route  path='/item/:idItem' element={<ItemDetailContainer />} />
      </Routes> 
    
    </BrowserRouter>

    </>

  );
}

export default App;
