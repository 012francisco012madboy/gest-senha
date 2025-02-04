import { useContext, useState } from "react";
import { PiXCircleBold } from "react-icons/pi";
import { Load, SubTitle } from "../other/extra";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { GlobalContext } from "../../context/global-context";

const CreateEmployee = () => {
    const { actCompany, showModal, setShowModal, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { getListUser } = useContext(GlobalContext)
    
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ id_type, setIdType ] = useState("-1")
    const id_company = actCompany

    const [ btnDisabled, setBtnDisabled ] = useState(false)

    function addEmployee(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(name && email && id_type != "-1"){
            setBtnDisabled(true)

            Api.post("user-add", {
                name,
                email,
                id_type,
                id_company
            })
            .then((response) => {
                setTextAlert(response?.data.message)
                setTypeAlert(true)

                setBtnDisabled(false)

                setName("")
                setEmail("")
                setIdType("-1")
                setShowModal(null)
                actCompany && getListUser(actCompany)
            })
            .catch(err => {
                setTextAlert(err?.response?.data.message)
                setTypeAlert(false)

                setBtnDisabled(false)
            })
        }
    }

    return (
        <div className={showModal == "create-employee" ? "overlay-container active" : "overlay-container"}>
            <form className="overlay-content" onSubmit={(e) => addEmployee(e)}>
                <div className="each-title">
                    <SubTitle title="Adicionar funcionário"/>
                    <i onClick={() => setShowModal(null)}><PiXCircleBold/></i>
                </div>
                <div className="each-input">
                    <label htmlFor="">Nome do funcionário</label>
                    <input
                        required
                        type="text"
                        value={name}
                        placeholder="John Doe"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="each-input">
                    <label htmlFor="">Email do funcionário</label>
                    <input
                        required
                        type="email"
                        value={email}
                        placeholder="johndoe@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="each-input">
                    <label htmlFor="">Permissões</label>
                    <select onChange={(e) => setIdType(e.target.value)}>
                        <option value="-1">Selecione</option>
                        <option value="1">Administrador</option>
                        <option value="2">Funcionário</option>
                    </select>
                </div>
                <div className="each-button">
                    <button disabled={btnDisabled} type="submit">{btnDisabled ? <Load/> : "Salvar"}</button>
                </div>
            </form>
        </div>
    );
}
 
export default CreateEmployee;