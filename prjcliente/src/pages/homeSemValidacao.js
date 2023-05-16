import Style from './../assets/styles/home.module.css';

export default function Home() {
    return (
        <div>
            <div className={Style.banner}>
                <h1 className={Style.txtinicial}>
                    Sistema de aviso de ocorrências de interrupção <br />
                    de tráfego em rodovias (SAOITR)
                </h1>
            </div>  
            <nav className={Style.navbar}>
                <ul className={Style['navbar-nav']}>
                    <li className={Style['nav-item']}>
                        <a className={Style.a} href=""> 
                        Listagem de incidentes
                        </a>
                    </li>
                    <li className={Style['nav-item']} >
                        <a className={Style.a} href="/welcome">
                        Sair
                        </a>
                    </li>
                </ul>
            </nav>  
          
        </div>
    )
}