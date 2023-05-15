import './../assets/styles/welcome.css';
import React from "react";
import Register from "./../pages/register.js";
import Login from "./../pages/login.js";
import {BrowserRouter as Router, Route, Routes, Switch, Link, AbortedDeferredError } from 'react-router-dom';

export default function Welcome() {
    return (
            <div className={`background`}>
                <div className={`container conwel`}>
                    <h1 className={`txtinicial`}>
                        Sistema de aviso de ocorrências de interrupção <br />
                        de tráfego em rodovias (SAOITR)
                    </h1> <br />
                    <button to="/register" className={`btn btw`}>Cadastro</button>
                    <button to="/login" className={`btn btw`}>Login</button>
                </div>
            </div>

    )
}


// <Router>
// <div className={`background`}>
//     <div className={`container conwel`}>
//         <h1 className={`txtinicial`}>
//             Sistema de aviso de ocorrências de interrupção <br />
//             de tráfego em rodovias (SAOITR)
//         </h1> <br />
//         <Link to="/register" className={`btn btw`}>Cadastro</Link>
//         <Link to="/login" className={`btn btw`}>Login</Link>
//     </div>
// </div>
// <Routes>
//     <Route path="/register" element={<Register />} />
//     <Route path="/login" element={<Login />} />
// </Routes>
// </Router>