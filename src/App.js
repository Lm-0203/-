import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/a"
          element={<CompA></CompA>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
