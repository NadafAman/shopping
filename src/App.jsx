
import './App.css';
import Navbar from './Components/Common/Navbar';
import { Route, Routes } from 'react-router-dom';
import AllProducts from './Components/AllProducts/AllProducts';
import Cart from './Components/Cart/Cart';
import ProductDetail from './Components/AllProducts/ProductDetails';

function App() {
  return (
    <div className="app--container flex flex-col relative">
      <Navbar />
      <div className="mt-14 router--container">
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetail/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
