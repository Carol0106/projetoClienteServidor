import Style from './../assets/styles/register.css';

export default function Register() {
    return (
        <div className={`container containerP ${Style}`}>
            <form action="" method="POST">
            <h2>Cadastro</h2>
            <input type="text" name="name" placeholder="Nome" /><br />

            <input type="email" name="email" placeholder="Email" /><br />

            <input type="password" name="password" placeholder="Senha" /><br />

            <input type="password" name="confirmpassword" placeholder="Confirmação de senha" /><br />

            <div className={`row botoes ${Style}`}>
                <button className={`btn btcancelar ${Style}`}>Cancelar</button>
                <button className={`btn btsalvar ${Style}`}>Cadastrar</button>
            </div>
            </form>
        </div>
    )
}