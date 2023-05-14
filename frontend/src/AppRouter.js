
import { Routes, Route, BrowserRouter } from "react-router-dom";

import EditorPage from './EditorPage.js';
// import resultView from './resultView.js';
import ViewResult from './ViewResult.js';

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<EditorPage />} />
            <Route path="/resultView" element={<ViewResult />} />
        </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
