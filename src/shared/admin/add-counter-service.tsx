import { Fragment, useContext, useEffect, useState } from "react";
import { PiXCircleBold } from "react-icons/pi";
import { SubTitle } from "../other/extra";
import { AuthContext } from "../../context/auth-context";
import { IDefault } from "../../interface/IDefault";
import { GlobalContext } from "../../context/global-context";
import { Api } from "../../server/api";
import { ICounter } from "../../interface/ICounter";
import { Spinner } from "@/components/ui/spinner";

interface counterProps{
    counter: IDefault
}

const AddCounterService = ({ counter } : counterProps) => {
    const { actCompany, showModal, setShowModal, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { getEachCounter, getListCounter, getListService, listService} = useContext(GlobalContext)

    const id_counter = counter.id
    const name_counter = counter.name
    
    const [ id_service, setIdService ] = useState("")

    const [ disabledButton, setDisabledButton ] = useState(false)
    
        const [ eachCounter, setEachCounter ] = useState<ICounter | undefined>()

    useEffect(() => {
        actCompany && getListService(actCompany)
    }, [getListService, actCompany])

    useEffect(() => {
        getEachCounter(counter.id, setEachCounter)
    }, [getEachCounter, counter, setEachCounter])

    function addServiceCounter(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(id_counter && id_service != "-1"){
            setDisabledButton(true)

            Api.post("front-desk-add", {
                id_service,
                id_counter
            })
            .then((response) => {
                setIdService("-1")
                setShowModal(null)
                setEachCounter(undefined)
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
        else{
            setTypeAlert(false)
            setTextAlert("Selecione um serviço")
        }
    }

    return (
        <div className={showModal == "add-counter-service" ? "overlay-container active" : "overlay-container"}>
            <form className="overlay-content" onSubmit={(e) => addServiceCounter(e)}>
                <div className="each-title">
                    <SubTitle title="Atribuir serviço ao balcão"/>
                    <i onClick={() => {setShowModal(null), setEachCounter(undefined)}}><PiXCircleBold/></i>
                </div>
                <div className="each-input">
                    <label htmlFor="">Referência do balcão</label>
                    <input
                        required
                        type="text"
                        value={name_counter}
                        placeholder="Ex: A"
                        disabled
                    />
                </div>
                <div className="each-input">
                    {
                        !eachCounter?.id_front_desk ?
                        <Fragment>
                            <label htmlFor="">Serviços</label>
                            <select onChange={(e) => setIdService(e.target.value)}>
                                <option value="-1">Selecione</option>
                                {
                                    listService?.map((each, i) => (
                                        <option key={i} value={each.id}>{each.name}</option>
                                    ))
                                }
                            </select>
                        </Fragment> :
                        <label style={{fontSize: "10pt", cursor: "pointer", color: "red"}}>
                            Este balcão já tem um serviço asoociado
                        </label>
                    }
                </div>
                <div className="each-button">
                    <button disabled={disabledButton} type="submit">{disabledButton ? <Spinner/> : "Salvar"}</button>
                </div>
            </form>
        </div>
    );
}
 
export default AddCounterService;