import { Fragment, useContext, useState } from "react";
import { PiXCircleBold } from "react-icons/pi";
import { Load, SubTitle } from "../other/extra";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { GlobalContext } from "../../context/global-context";
import { Alert } from "../other/alert";

const CreateService = () => {
    const { actCompany, showModal, setShowModal, textAlert, setTextAlert, typeAlert, setTypeAlert } = useContext(AuthContext)
    const { getListService} = useContext(GlobalContext)

    const [ name, setName ] = useState("")
    const id_company = actCompany

    const [ btnDisabled, setBtnDisabled ] = useState(false)

    function saveService(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(name){
            setBtnDisabled(true)

            Api.post("/service-add", {
                name,
                id_company
            })
            .then((response) => {
                setName("")
                setShowModal(null)
                actCompany && getListService(actCompany)
                setBtnDisabled(false)
                setTextAlert(response?.data.message)
                setTypeAlert(true)
            })
            .catch((erro) => {
                setBtnDisabled(false)
                setTextAlert(erro?.response.data.message)
                setTypeAlert(false)
            })
        }
        else{
            setTextAlert("Preencha o campo")
            setTypeAlert(false)
        }
    }

    return (
        <Fragment>
            <div className={showModal == "create-service" ? "overlay-container active" : "overlay-container"}>
                <form className="overlay-content" onSubmit={(e) => saveService(e)}>
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
            {
                textAlert &&
                <Alert  text={textAlert} type={typeAlert}/>
            }
        </Fragment>
    );
}
 
export default CreateService;