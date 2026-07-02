import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { Api } from "../../server/api";
import { Button } from "@/components/ui/button";
import { BellRing } from "lucide-react";

const Footer = () => {
    const { voice, actCompany, actUserAssistant, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { actTicket, setActTicket, getListTicket } = useContext(GlobalContext)

    async function handleNextTicket() {
        const lastTicket = actTicket?.ref

        if (!lastTicket) {
            await Api.get(`ticket-call-next/${actUserAssistant?.id_service}/${actUserAssistant?.id_assistant}`)
                .then((response) => {
                    setActTicket(response?.data)

                    actUserAssistant && actCompany && getListTicket(actUserAssistant?.id_service, actCompany)

                    actUserAssistant && voice(response?.data.ref, actUserAssistant?.ref_counter)
                })
                .catch(erro => {
                    console.log(erro)
                })
        }
        else {
            setTextAlert("Finaliza o atendimento atual")
            setTypeAlert(false)
        }
    }

    return (
        <footer className="min-h-20 h-20 flex items-center justify-center px-4 bg-brand">
            <Button type="button" variant="primary" onClick={handleNextTicket}>
                <BellRing/> Chamar próximo
            </Button>
        </footer>
    );
}

export default Footer;