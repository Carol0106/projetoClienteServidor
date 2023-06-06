import Style from './../../assets/styles/perfil.module.css';
import Menu from '../../componentes/menu';

export default function Perfil() {

    return (
          <div className={`${Style.background}`}>
            <div className={`container ${Style.containerP}`}>
                <Menu/>

                <div>
                <h2 className={`${Style.title}`}>Perfil</h2>
                <a className={`${Style.btnAtualizar}`} href="/users/update"><b>Atualizar</b></a>
                </div>
                <br />
                <div className={`${Style.divRow}`}>
                    <label>Nome:</label>
                    <h5>Caroline Wagner</h5>
                </div>
                <div className={`${Style.divRow}`}>
                    <label>E-mail:</label>
                    <h5>wagner@gmail.com</h5>
                </div>
            </div>
          </div>
    )
}