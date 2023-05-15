import './App.css';
import MainPage from "./mainPage";
import Login from "./loginPage";
import Register from "./registerPage";
import Levels from "./levelSelectPage";
import Problems from './problemSelectPage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Register' element={<Register />}></Route>
        <Route path='/Levels' element={<Levels />}></Route>
        <Route path='/Problems' element={<Problems />}></Route>
      </Routes>
    </BrowserRouter>
  
  )
}

export default App;