import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function CompA() {
  return <div>组件A</div>;
}

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
