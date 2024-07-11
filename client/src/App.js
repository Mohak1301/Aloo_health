
import Homepage from './pages/Homepage.js';
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import PrivateRoute from './Routes/Private.js';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="" element={<PrivateRoute />}>
    <Route path="/" element={<Homepage/>}></Route>
        </Route>
      
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
