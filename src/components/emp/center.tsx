import { MdNotificationsActive } from "react-icons/md";
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { Title } from "../other/extra";
import Sidebar from "./sidebar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { Api } from "../../server/api";

const Center = () => {
    const { actCompany, setTextAlert, setTypeAlert, actUserAssistant, voice } = useContext(AuthContext)
    const { actTicket, setActTicket, getActTicket, getListTicket } = useContext(GlobalContext)

    useEffect(() => {
        actUserAssistant && getActTicket(actUserAssistant?.id_assistant)
    }, [actUserAssistant, getActTicket])

    function handleFinished(state: string){
        if(actTicket && state){
            Api.put(`/ticket-call-finished/${actTicket.id_ref}`, {
                state
            })
            .then((response) => {
                setTextAlert(response?.data.message)
                setTypeAlert(true)

                setActTicket(undefined)

                actUserAssistant && actCompany && getListTicket(actUserAssistant?.id_service, actCompany)
            })
            .catch((err) => {
                setTextAlert(err?.response?.data.message)
                setTypeAlert(false)
            })
        }
    }

    function handleVoice(){
        actTicket && actUserAssistant && voice(actTicket.ref, actUserAssistant?.ref_counter)
    }

    return (
        <div className="center">
            <div className="left">
                <Title title="Senhas em espera"/>
                <Sidebar/>
            </div>
            <div className="right">
                <div className="act">
                    <strong>{actTicket ? "Senha " + actTicket.ref : "0"}</strong>
                    <p>Atendimento atual</p>
                </div>
                <div className="menu">
                    <div
                        className="each_menu"
                        onClick={handleVoice}
                    >
                        <p><i><MdNotificationsActive/></i> Chamar novamente</p>
                    </div>
                    <div
                        className="each_menu"
                        onClick={() => handleFinished("4")}
                    >
                        <p><i><PiArrowBendUpLeftBold/></i> Voltar para fila</p>
                    </div>
                    <div
                        className="each_menu"
                        onClick={() => handleFinished("6")}
                    >
                        <p><i><MdCheck/></i> Finalizar</p>
                    </div>
                    <div
                        className="each_menu"
                        onClick={() => handleFinished("5")}
                    >
                        <p><i><MdClose/></i> Não compareceu</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Center;