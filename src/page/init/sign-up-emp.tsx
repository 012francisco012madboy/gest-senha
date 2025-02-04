import "../../css/init.css"
import { Load, SubTitle } from "../../components/other/extra";
import { Fragment, useContext, useEffect, useState } from "react";
import { Api } from "../../server/api";
import { AuthContext } from "../../context/auth-context";
import { Alert } from "../../components/other/alert";
import { useNavigate } from "react-router-dom";

const SignUpEmp = () => {
    const { name_company, email_company, textAlert, setTextAlert, typeAlert, setTypeAlert, getUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const [ btnDisabled, setBtnDisabled ] = useState(false)

    useEffect(() => {
        if(!name_company && !email_company){
            navigate("/sign-up-company")
            setTextAlert("Defina a tua empresa")
            setTypeAlert(false)
        }
    })

    const [ name_user, setNameUser ] = useState("")
    const [ email_user, setEmailUser ] = useState("")
    const [ password_user, setPassowrdUser ] = useState("")
    const [ confirm_password, setConfirmPassword ] = useState("")

    function handleSignUp(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(name_user && email_user && password_user && confirm_password){
            if(password_user == confirm_password){
                setBtnDisabled(true)

                Api.post("sign-up", {
                    name_company,
                    email_company,

                    name_user,
                    email_user,
                    password_user
                })
                .then((response) => {
                    localStorage.setItem("actUser", response?.data.user?.id)

                    setBtnDisabled(false)
                    setTextAlert(response?.data.message)
                    setTypeAlert(true)

                    getUser()

                    navigate("/sign-in")
                })
                .catch((error) => {
                    setBtnDisabled(false)
                    setTextAlert(error.response?.data.message)
                    setTypeAlert(false)
                })
            }
        }
    }

    return (
        <Fragment>
            <div className="sign_container">
                <div className="sign_content">
                    <form className="content" onSubmit={(e) => handleSignUp(e)}>
                        <div className="each-title">
                            <SubTitle title="CADASTRAR ADMINISTRADOR"/>
                        </div>
                        <div className="each-input">
                            <label htmlFor="">Nome completo</label>
                            <input
                                required
                                type="text"
                                minLength={8}
                                value={name_user}
                                placeholder="Nome do administrador"
                                onChange={(e) => setNameUser(e.target.value)}
                            />
                        </div>
                        <div className="each-input">
                            <label htmlFor="">Email</label>
                            <input
                                required
                                type="email"
                                minLength={8}
                                value={email_user}
                                placeholder="E-mail do administrador"
                                onChange={(e) => setEmailUser(e.target.value)}
                            />
                        </div>
                        <div className="each-input">
                            <label htmlFor="">Password</label>
                            <input
                                required
                                type="password"
                                minLength={8}
                                value={password_user}
                                placeholder="Criar palavra passe"
                                onChange={(e) => setPassowrdUser(e.target.value)}
                            />
                        </div>
                        <div className="each-input">
                            <label htmlFor="">Confirmar password</label>
                            <input
                                required
                                type="password"
                                minLength={8}
                                value={confirm_password}
                                placeholder="Confirmar palavra passe"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="each-button">
                            <button disabled={btnDisabled} type="submit">{btnDisabled ? <Load/> : "Cadastrar"}</button>
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

export default SignUpEmp;