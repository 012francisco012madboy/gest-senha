import { Fragment, useContext, useEffect, useState } from "react";
import { PiXCircleBold } from "react-icons/pi";
import { Load, SubTitle } from "../other/extra";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { GlobalContext } from "../../context/global-context";
import { Alert } from "../other/alert";
import { IDefault } from "../../interface/IDefault";

interface updateProps{
    service: string
}

const UpdateService = ({service} : updateProps) => {
    const { actCompany, showModal, setShowModal, textAlert, setTextAlert, typeAlert, setTypeAlert } = useContext(AuthContext)
    const { getListService, getEachService} = useContext(GlobalContext)

    const [ name, setName ] = useState("")

    const [ eachService, setEachService ] = useState<IDefault>()

    const [ btnDisabled, setBtnDisabled ] = useState(false)

    useEffect(() => {
        getEachService(service, setEachService)
    }, [getEachService, service, setEachService])

    useEffect(() => {
        eachService && setName(eachService?.name)
    }, [eachService, setName])

    function setData(){
        setName("")
    }

    function updateService(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(name){
            setBtnDisabled(true)

            Api.put(`/service-update/${eachService?.id}`, {
                name
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
            <div className={showModal == "update-service" ? "overlay-container active" : "overlay-container"}>
                <form className="overlay-content" onSubmit={(e) => updateService(e)}>
                    <div className="each-title">
                        <SubTitle title="Atualizar um serviço"/>
                        <i onClick={() => {setShowModal(null), setData()}}><PiXCircleBold/></i>
                    </div>
                    <div className="each-input">
                        <label htmlFor="">Descreva o serviço</label>
                        <input
                            required
                            type="text"
                            defaultValue={name}
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
 
export default UpdateService;