import { useContext, useState } from "react";
import { PiXCircleBold } from "react-icons/pi";
import { Load, SubTitle } from "../other/extra";
import { AuthContext } from "../../context/auth-context";

const CreateEmployee = () => {
    const { showModal, setShowModal } = useContext(AuthContext)
    const [ name, setName ] = useState("")

    const [ btnDisabled ] = useState(false)

    return (
        <div className={showModal == "create-employee" ? "overlay-container active" : "overlay-container"}>
            <form className="overlay-content">
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
                        value={name}
                        placeholder="johndoe@gmail.com"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="each-input">
                    <label htmlFor="">Permissões</label>
                    <select>
                        <option value="-1">Selecione</option>
                        <option value="-1">Administrador</option>
                        <option value="-1">Funcionário</option>
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