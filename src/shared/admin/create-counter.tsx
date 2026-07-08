import { useContext, useState } from "react";
import { PiXCircleBold } from "react-icons/pi";
import { SubTitle } from "../other/extra";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { GlobalContext } from "../../context/global-context";
import { Spinner } from "@/components/ui/spinner";

const CreateCounter = () => {
    const { actCompany, showModal, setShowModal, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { getListCounter } = useContext(GlobalContext)

    const [ref, setRef] = useState("")
    const id_company = actCompany

    const [disabledButton, setDisabledButton] = useState(false)

    function saveCounter(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (ref) {
            setDisabledButton(true)

            Api.post("/counter-add", {
                ref,
                id_company
            })
                .then((response) => {
                    setRef("")
                    setShowModal(null)
                    actCompany && getListCounter(actCompany)
                    setDisabledButton(false)
                    setTextAlert(response?.data.message)
                    setTypeAlert(true)
                })
                .catch((erro) => {
                    setDisabledButton(false)
                    setTextAlert(erro?.response.data.message)
                    setTypeAlert(false)
                })
        }
        else {
            setTextAlert("Preencha o campo")
            setTypeAlert(false)
        }
    }

    return (
        <div className={showModal == "create-counter" ? "overlay-container active" : "overlay-container"}>
            <form className="overlay-content" onSubmit={(e) => saveCounter(e)}>
                <div className="each-title">
                    <SubTitle title="Adicionar balcão" />
                    <i onClick={() => setShowModal(null)}><PiXCircleBold /></i>
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
                    <button disabled={disabledButton} type="submit">{disabledButton ? <Spinner /> : "Salvar"}</button>
                </div>
            </form>
        </div>
    );
}

export default CreateCounter;