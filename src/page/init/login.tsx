import { Title } from "../../components/other/extra";
import "../../css/init.css"

const Login = () => {
    return (
        <div className="login_container">
            <div className="log_content">
                <Title title="Login"/>
                <div className="content">
                    <form action="/counter">
                        <input type="email" placeholder="E-mail" />
                        <input type="text" placeholder="Palavra passe" />
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;