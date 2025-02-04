import "../../css/init.css"
import { Load, SubTitle } from "../../components/other/extra";
import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { Alert } from "../../components/other/alert";

const SignIn = () => {
    const { login, textAlert, typeAlert } = useContext(AuthContext)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const [ btnDisabled, setBtnDisabled ] = useState(false)

    function handleLogin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        login(email, password, setBtnDisabled)
    }

    return (
        <Fragment>
            <div className="sign_container">
                <div className="sign_content">
                    <form className="content" onSubmit={(e) => handleLogin(e)}>
                        <div className="each-title">
                            <SubTitle title="INICIAR SESSÃO"/>
                        </div>
                        <div className="each-input">
                            <label htmlFor="">Email</label>
                            <input
                                required
                                type="email"
                                value={email}
                                placeholder="E-mail"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="each-input">
                            <label htmlFor="">Password</label>
                            <input
                                required
                                type="password"
                                value={password}
                                placeholder="Palavra passe"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="each-button">
                            <button disabled={btnDisabled} type="submit">{btnDisabled ? <Load/> : "Entrar"}</button>
                        </div>
                    </form>
                </div>
            </div>
            {
                textAlert &&
                <Alert text={textAlert} type={typeAlert}/>
            }
        </Fragment>
    );
}

export default SignIn;