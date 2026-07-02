import "../../css/init.css"
import { SubTitle } from "../../shared/other/extra";
import { Fragment, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../shared/other/alert";

const SignUpComp = () => {
    const { name_company, setNameCompany, email_company, setEmailCompany, textAlert, setTextAlert, typeAlert, setTypeAlert } = useContext(AuthContext)

    const navigate = useNavigate()

    function nextSign(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(name_company && email_company){
            if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_company)){
                navigate("/sign-up-employee")
            }
            else{
                setTextAlert("Verifique o seu e-mail")
                setTypeAlert(false)
            }
        }
        else{
            setTextAlert("Preencha todos os campos")
            setTypeAlert(false)
        }
    }

    return (
        <Fragment>
            <div className="sign_container">
                <div className="sign_content">
                    <form className="content" onSubmit={(e) => nextSign(e)}>
                        <div className="each-title">
                            <SubTitle title="CADASTRAR EMPRESA"/>
                        </div>
                        <div className="each-input">
                            <label htmlFor="">Nome</label>
                            <input
                                required
                                type="text"
                                value={name_company}
                                placeholder="Nome da empresa"
                                onChange={(e) => setNameCompany(e.target.value)}
                            />
                        </div>
                        <div className="each-input">
                            <label htmlFor="">Email</label>
                            <input
                                required
                                type="email"
                                value={email_company}
                                placeholder="E-mail da empresa"
                                onChange={(e) => setEmailCompany(e.target.value)}
                            />
                        </div>
                        <div className="each-button">
                            <button type="submit">Avançar</button>
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

export default SignUpComp;