import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Stripe from "./components/Stripe";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          // Authentication routes
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
          // Products routes
          <Route path="/views/products" element={<Products />}></Route>
          <Route path="/views/products/:pid" element={<Product />}></Route>
          // Cart route
          <Route path="/views/carts" element={<Cart />}></Route>
          // Payment route
          <Route path="views/payment/:cid" element={<Stripe />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
