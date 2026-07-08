import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { Api } from "../../server/api";
import { Button } from "@/components/ui/button";
import { BellRing } from "lucide-react";
import { useAlert } from "@/provider/alert";
import axios from "axios";

const Footer = () => {
    const { voice, actCompany, actUserAssistant } = useContext(AuthContext)
    const { actTicket, setActTicket, getListTicket } = useContext(GlobalContext)

    const { FailedAlert } = useAlert()

    async function handleNextTicket() {
        const lastTicket = actTicket?.ref

        if (lastTicket) {
            return FailedAlert("Finaliza o atendimento atual")
        }

        try {
            const response = await Api.get(`ticket-call-next/${actUserAssistant?.id_service}/${actUserAssistant?.id_assistant}`)

            setActTicket(response?.data)

            actUserAssistant && actCompany && getListTicket(actUserAssistant?.id_service, actCompany)

            actUserAssistant && voice(response?.data.ref, actUserAssistant?.ref_counter)
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                FailedAlert(e?.response?.data.message || "Erro inesperado")
            }
            else {
                FailedAlert("Erro inesperado")
            }
        }
    }

    return (
        <footer className="min-h-20 h-20 flex items-center justify-center px-4 bg-brand">
            <Button type="button" variant="primary" onClick={handleNextTicket}>
                <BellRing /> Chamar próximo
            </Button>
        </footer>
    );
}

export default Footer;