import { useContext } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";

const Footer = () => {
    const { voice, actUserAssistant, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { actTicket, getNextTicket} = useContext(GlobalContext)
    
    function handleVoice(){
        actTicket && actUserAssistant && voice(actTicket?.ref, actUserAssistant?.ref_counter)
    }
    
    function handleNextTicket(e: React.MouseEvent<HTMLFormElement, MouseEvent>){
        e.preventDefault()

        const lastTicket = actTicket?.ref

        if(!lastTicket){
            actUserAssistant && getNextTicket(actUserAssistant?.id_service, actUserAssistant?.id_assistant)

            handleVoice()
        }
        else{
            setTextAlert("Finaliza o atendimento atual")
            setTypeAlert(false)
        }
    }

    return (
        <div className="footer">
            <form onClick={(e) => handleNextTicket(e)}>
                <button type="submit"><i><MdNotificationsActive/></i> Chamar próximo</button>
            </form>
        </div>
    );
}
 
export default Footer;