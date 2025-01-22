import { useContext, useState } from "react";
import { PiXCircleBold } from "react-icons/pi";
import { Load, SubTitle } from "../other/extra";
import { AuthContext } from "../../context/auth-context";

const CreateService = () => {
    const { showModal, setShowModal } = useContext(AuthContext)
    const [ name, setName ] = useState("")

    const [ btnDisabled ] = useState(false)

    return (
        <div className={showModal == "create-service" ? "overlay-container active" : "overlay-container"}>
            <form className="overlay-content">
                <div className="each-title">
                    <SubTitle title="Adicionar serviço"/>
                    <i onClick={() => setShowModal(null)}><PiXCircleBold/></i>
                </div>
                <div className="each-input">
                    <label htmlFor="">Descreva o serviço</label>
                    <input
                        required
                        type="text"
                        value={name}
                        placeholder="Ex: Depósito"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="each-button">
                    <button disabled={btnDisabled} type="submit">{btnDisabled ? <Load/> : "Salvar"}</button>
                </div>
            </form>
        </div>
    );
}
 
export default CreateService;