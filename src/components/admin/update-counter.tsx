import { Fragment, useContext, useEffect, useState } from "react";
import { PiMinusCircle, PiXCircleBold } from "react-icons/pi";
import { Load, SubTitle } from "../other/extra";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { GlobalContext } from "../../context/global-context";
import { Alert, Question } from "../other/alert";
import { IDefault } from "../../interface/IDefault";
import { ICounter } from "../../interface/ICounter";

interface counterProps{
    counter: IDefault
}

const UpdateCounter = ({counter} : counterProps) => {
    const { actCompany, textQuestion, setTextQuestion, showModal, setShowModal, textAlert, setTextAlert, typeAlert, setTypeAlert } = useContext(AuthContext)
    const { getListCounter, getEachCounter} = useContext(GlobalContext)

    const [ ref, setRef ] = useState("")
    const id_company = actCompany

    const [ eachCounter, setEachCounter ] = useState<ICounter | undefined>()

    useEffect(() => {
        getEachCounter(counter.id, setEachCounter)
    }, [getEachCounter, counter, setEachCounter])

    const [ btnDisabled, setBtnDisabled ] = useState(false)

    function updateCounter(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(ref){
            setBtnDisabled(true)

            Api.put(`/counter-update/${counter.id}`, {
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
    
    function removeService(){
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

    function validateQuestion(){
        setTextQuestion("Desejas desassociar este serviço?")
    }

    return (
        <Fragment>
            <div className={showModal == "update-counter" ? "overlay-container active" : "overlay-container"}>
                <form className="overlay-content" onSubmit={(e) => updateCounter(e)}>
                    <div className="each-title">
                        <SubTitle title="Atualizar um balcão"/>
                        <i onClick={() => {setShowModal(null), setEachCounter(undefined)}}><PiXCircleBold/></i>
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
                        eachCounter?.id_front_desk &&
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
                                style={{fontSize: "10pt", cursor: "pointer", color: "red"}}
                                onClick={validateQuestion}
                            >
                                <PiMinusCircle/> Desassociar o serviço
                            </label>
                        </div>
                    }
                    <div className="each-button">
                        <button disabled={btnDisabled} type="submit">{btnDisabled ? <Load/> : "Salvar"}</button>
                    </div>
                </form>
            </div>
            {
                textAlert &&
                <Alert  text={textAlert} type={typeAlert}/>
            }
            {
                textQuestion && showModal == "update-counter" &&
                <Question  text={textQuestion} validate={removeService}/>
            }
        </Fragment>
    );
}
 
export default UpdateCounter;