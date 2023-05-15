import Style from './../assets/styles/login.css';

export default function Login() {
    return (
        <div className={`container containerP ${Style}`}>
            <form action="" method="POST">
                <h2>Login</h2>
                <input type="email" name="email" placeholder="Email" /><br />

                <input type="password" name="password" placeholder="Senha" /><br /><br />

                <div className={`row botoes ${Style}`}>
                    <button className={`btn btcancelar ${Style}`}>Cancelar</button>
                    <button className={`btn btsalvar ${Style}`}>Acessar</button>
                </div>
                <br/>
                <a href=""><b>Entrar sem cadastro</b></a>
            </form>
        </div>
     
    )
}