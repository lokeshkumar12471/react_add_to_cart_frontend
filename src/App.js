import { Routes, Route } from 'react-router-dom';
import './App.css';
import AddProduct from './Component/AddProduct';
import Header from './Component/Header';
import Products from './Component/Products';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<AddProduct />} />
        <Route exact path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
