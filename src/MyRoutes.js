import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navibar from "./Components/Navibar";
import MainProvider from "./context/MainProvider";
import AddPage from "./Pages/AddPage";
import EditPage from "./Pages/EditPage";
import HomePage from "./Pages/HomePage";

const MyRoutes = () => {
  return (
    <MainProvider>
      <BrowserRouter>
        <Navibar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="edit/:id" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </MainProvider>
  );
};

export default MyRoutes;
