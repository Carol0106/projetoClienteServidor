import Style from './../../assets/styles/perfil.module.css';
import Menu from '../../componentes/menu';

export default function Update() {

    return (
          <div className={`${Style.background}`}>
            <div className={`container ${Style.containerP}`}>
                <Menu/>

                <form >
                    <h2 className={`${Style.title}`}>Atualizar cadastro</h2>
                    <input className={`${Style.input}`} type="text" name="name" placeholder="Nome"/><br />

                    <input className={`${Style.input}`} type="email" name="email" placeholder="Email"/><br />

                    <input className={`${Style.input}`} type="password" name="passwordOld" placeholder="Senha atual" /><br />

                    <input className={`${Style.input}`} type="password" name="password" placeholder="Nova senha" /><br />

                    <div className={`row ${Style.botoes}`}>
                        <button type="submit" className={`${Style.btn} ${Style.btsalvar}`}>Cadastrar</button>
                        <a href="/" type="button" className={`${Style.btn} ${Style.btcancelar}`}>Cancelar</a>
                    </div>
                </form>
            </div>
          </div>
    )
}