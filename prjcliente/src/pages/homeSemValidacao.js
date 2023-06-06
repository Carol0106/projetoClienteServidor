import Style from './../assets/styles/home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faList } from '@fortawesome/free-solid-svg-icons'



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
                    <a className={Style.a} href="/occurrences/getAll"> 
                        <FontAwesomeIcon icon={faList} style={{color: "#ffffff", marginRight: '5px'}} />
                        Listagem de incidentes
                        </a>
                    </li>
                    <li className={Style['nav-item']} >
                        <a className={Style.a} href="/login">
                        <FontAwesomeIcon icon={faAddressCard} style={{color: "#ffffff", marginRight: '5px'}} />
                        Login
                        </a>
                    </li>
                </ul>
            </nav>  
          
        </div>
    )
}