import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import User from "./pages/User";
import Admin from "./pages/Admin";

import "./Reset.css"
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<User />}></Route>
                <Route path="/aoTmzjarhksflwk" element={<Admin />}></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
