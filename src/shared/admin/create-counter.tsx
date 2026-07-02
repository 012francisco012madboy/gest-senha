import { Fragment, useContext, useState } from "react";
import { PiXCircleBold } from "react-icons/pi";
import { Load, SubTitle } from "../other/extra";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { GlobalContext } from "../../context/global-context";
import { Alert } from "../other/alert";

const CreateCounter = () => {
    const { actCompany, showModal, setShowModal, textAlert, setTextAlert, typeAlert, setTypeAlert } = useContext(AuthContext)
    const { getListCounter} = useContext(GlobalContext)

    const [ ref, setRef ] = useState("")
    const id_company = actCompany

    const [ btnDisabled, setBtnDisabled ] = useState(false)

    function saveCounter(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(ref){
            setBtnDisabled(true)

            Api.post("/counter-add", {
                ref,
                id_company
            })
            .then((response) => {
                setRef("")
                setShowModal(null)
                actCompany && getListCounter(actCompany)
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
            <div className={showModal == "create-counter" ? "overlay-container active" : "overlay-container"}>
                <form className="overlay-content" onSubmit={(e) => saveCounter(e)}>
                    <div className="each-title">
                        <SubTitle title="Adicionar balcão"/>
                        <i onClick={() => setShowModal(null)}><PiXCircleBold/></i>
                    </div>
                    <div className="each-input">
                        <label htmlFor="">Referência do balcão (A-Z)</label>
                        <input
                            required
                            type="text"
                            value={ref}
                            maxLength={3}
                            placeholder="Ex: A"
                            onChange={(e) => setRef(e.target.value)}
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
 
export default CreateCounter;