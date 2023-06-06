import Style from './../assets/styles/home.module.css';
import Menu from './../componentes/menu';

export default function Home() {
    return (
        <div>
            <div className={Style.banner}>
                <h1 className={Style.txtinicial}>
                    Sistema de aviso de ocorrências de interrupção <br />
                    de tráfego em rodovias (SAOITR)
                </h1>
            </div>  
           < Menu />
        </div>
    )
}