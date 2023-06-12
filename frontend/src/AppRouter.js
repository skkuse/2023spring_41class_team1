
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';

import MainPage from "./mainPage";
import Login from "./loginPage";
import Register from "./registerPage";
import Levels from "./levelSelectPage";
import Problems from './problemSelectPage';

import EditorPage from './EditorPage.js';
import ViewResult from './ViewResult.js';

function AppRouter() {
  const tempStyle={
    background:" #263747",
  }
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/Levels' element={<Levels />}></Route>
          <Route path='/Problems/Easy' element={<Problems />}></Route>
          <Route path='/Problems/Normal' element={<Problems />}></Route>
          <Route path='/Problems/Hard' element={<Problems />}></Route>
          <Route style={tempStyle} path="/EditorPage" element={<EditorPage />} />
          <Route style={tempStyle} path="/resultView" element={<ViewResult />} />

            
        </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
