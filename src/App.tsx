import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
