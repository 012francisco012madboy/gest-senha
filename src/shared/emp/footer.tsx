import { useContext } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { Api } from "../../server/api";

const Footer = () => {
    const { voice, actCompany, actUserAssistant, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { actTicket, setActTicket, getListTicket} = useContext(GlobalContext)
    
    async function handleNextTicket(e: React.MouseEvent<HTMLFormElement, MouseEvent>){
        e.preventDefault()

        const lastTicket = actTicket?.ref

        if(!lastTicket){
            await Api.get(`ticket-call-next/${actUserAssistant?.id_service}/${actUserAssistant?.id_assistant}`)
            .then((response) =>{
                setActTicket(response?.data)
    
                actUserAssistant && actCompany && getListTicket(actUserAssistant?.id_service, actCompany)
    
                actUserAssistant && voice(response?.data.ref, actUserAssistant?.ref_counter)
            })
            .catch(erro =>{
                console.log(erro)
            })
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