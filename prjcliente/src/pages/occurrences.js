import Style from './../assets/styles/occurrences.module.css';
import React, { useEffect } from "react";
import Menu from './../componentes/menu';

export default function Occurrences() {
    
    return (
            <div className={`${Style.background}`}>
                <div className={`container ${Style.containerP}`}>
                    {/* {errorMessage && <p className={`${Style.mensagemE}`}>{errorMessage}</p>}
                    {errorResponse && <p className={`${Style.mensagemE}`}>{errorResponse.message}</p>} */}

                    {/* onSubmit={handleLogin} */}
                    <Menu/ >
                    <form >
                        <h2 className={`${Style.title}`}>Reportar incidentes</h2>
                        {/* <input className={`${Style.input}`} type="text" name="Data" placeholder="Email" /><br />
                        <input className={`${Style.input}`} type="text" name="Hora" placeholder="Senha" /><br /><br />
                        <input className={`${Style.input}`} type="" name="password" placeholder="Senha" /><br /><br />
                        <input className={`${Style.input}`} type="password" name="password" placeholder="Senha" /><br /><br /> */}

                        <label for="data">Data:</label>
                        <input className={`${Style.input}`} type="date" id="data" name="data" />
                        <label for="hora">Hora:</label>
                        <input className={`${Style.input}`} type="time" id="hora" name="hora" />
                        <br />
                        <label for="tipo_incidente">Tipo de Incidente:</label>
                        <select className={`${Style.inputS}`} id="tipo_incidente" name="tipo_incidente">
                        <option value="acidente">Acidente</option>
                        <option value="roubo">Roubo</option>
                        <option value="incêndio">Incêndio</option>
                        </select>
                        <label for="km">KM:</label>
                        <input className={`${Style.input}`} type="text" id="km" name="km" />
                        <br />
                        <label for="local">Local:</label>
                        <input className={`${Style.input}`} type="text" id="local" name="local" />
                        <br />

                        <div className={`row ${Style.botoes}`}>
                            <button type="submit" className={`${Style.btn} ${Style.btsalvar}`}>Cadastrar</button>
                            <a href="/home" className={`${Style.btn} ${Style.btcancelar}`}>Cancelar</a>
                        </div>
                    </form>
                </div>
            </div>

    )
}
