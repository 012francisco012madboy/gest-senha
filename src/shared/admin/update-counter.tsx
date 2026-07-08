import { useContext, useEffect, useState } from "react";
import { PiMinusCircle, PiXCircleBold } from "react-icons/pi";
import { SubTitle } from "../other/extra";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { GlobalContext } from "../../context/global-context";
import { IDefault } from "../../interface/IDefault";
import { ICounter } from "../../interface/ICounter";
import { Spinner } from "@/components/ui/spinner";

interface counterProps {
    counter: IDefault
}

const UpdateCounter = ({ counter }: counterProps) => {
    const { actCompany, showModal, setShowModal, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { getListCounter, getEachCounter } = useContext(GlobalContext)

    const [ref, setRef] = useState("")
    const id_company = actCompany

    const [eachCounter, setEachCounter] = useState<ICounter | undefined>()

    useEffect(() => {
        getEachCounter(counter.id, setEachCounter)
    }, [getEachCounter, counter, setEachCounter])

    const [disabledButton, setDisabledButton] = useState(false)

    function updateCounter(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (ref) {
            setDisabledButton(true)

            Api.put(`/counter-update/${counter.id}`, {
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
                    setEachCounter(undefined)
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

    function removeService() {
        Api.put(`/front-desk-remove/${eachCounter?.id_front_desk}`)
            .then((response) => {
                setShowModal(null)
                setEachCounter(undefined)
                actCompany && getListCounter(actCompany)
                setTextAlert(response?.data.message)
                setTypeAlert(true)
            })
            .catch((erro) => {
                setTextAlert(erro?.response.data.message)
                setTypeAlert(false)
            })
    }

    function removeEmp() {
        Api.put(`/user-assistant-remove/${eachCounter?.id_assistant}`)
            .then((response) => {
                setShowModal(null)
                setEachCounter(undefined)
                actCompany && getListCounter(actCompany)
                setTextAlert(response?.data.message)
                setTypeAlert(true)
            })
            .catch((erro) => {
                setTextAlert(erro?.response.data.message)
                setTypeAlert(false)
            })
    }

    return (
        <div className={showModal == "update-counter" ? "overlay-container active" : "overlay-container"}>
            <form className="overlay-content" onSubmit={(e) => updateCounter(e)}>
                <div className="each-title">
                    <SubTitle title="Atualizar um balcão" />
                    <i onClick={() => { setShowModal(null), setEachCounter(undefined) }}><PiXCircleBold /></i>
                </div>
                <div className="each-input">
                    <label htmlFor="">Referência do balcão (A-Z)</label>
                    <input
                        required
                        type="text"
                        defaultValue={counter.name}
                        maxLength={3}
                        placeholder="Ex: A"
                        onChange={(e) => setRef(e.target.value)}
                    />
                </div>
                {
                    eachCounter?.service &&
                    <div className="each-input">
                        <label htmlFor="">Serviço associado</label>
                        <input
                            required
                            disabled
                            type="text"
                            defaultValue={eachCounter?.service}
                            maxLength={3}
                            placeholder="Ex: Depósito"
                        />
                        <label
                            style={{ fontSize: "10pt", cursor: "pointer", color: "red" }}
                            onClick={removeService}
                        >
                            <PiMinusCircle /> Desassociar o serviço
                        </label>
                    </div>
                }
                {
                    eachCounter?.user &&
                    <div className="each-input">
                        <label htmlFor="">Funcionário associado</label>
                        <input
                            required
                            disabled
                            type="text"
                            defaultValue={eachCounter?.user}
                            maxLength={3}
                            placeholder="Ex: John Doe"
                        />
                        <label
                            style={{ fontSize: "10pt", cursor: "pointer", color: "red" }}
                            onClick={removeEmp}
                        >
                            <PiMinusCircle /> Desassociar o funcionário
                        </label>
                    </div>
                }
                <div className="each-button">
                    <button disabled={disabledButton} type="submit">{disabledButton ? <Spinner /> : "Salvar"}</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateCounter;