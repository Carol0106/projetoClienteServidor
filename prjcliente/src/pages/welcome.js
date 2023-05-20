import Style from './../assets/styles/welcome.module.css';
import React, { useEffect } from "react";
import Register from "./users.js";
import Login from "./../pages/login.js";

export default function Welcome() {
    useEffect(() => {
        document.body.classList.add(Style.bodyClass);
    }, []);

    return (
            <div className={`${Style.background}`}>
                <div className={`container ${Style.conwel}`}>
                    <h1 className={`${Style.txtinicial}`}>
                        Sistema de aviso de ocorrências de interrupção <br />
                        de tráfego em rodovias (SAOITR)
                    </h1> <br />
                    <a href="/users" className={`${Style.btn} ${Style.btw}`}>Cadastro</a>
                    <a href="/login" className={`${Style.btn} ${Style.btw}`}>Login</a>
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