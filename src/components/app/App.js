import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage, ComicsPage } from "../pages";

import AppHeader from "../appHeader/AppHeader";

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" end element={<MainPage />} />
            <Route path="/comics" end element={<ComicsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
