import { useContext } from "react";
import { GlobalContext } from "../../context/global-context";
import { Button } from "@/components/ui/button";
import { BellRing } from "lucide-react";
import { useAlert } from "@/provider/alert";

const Footer = () => {
    const { lastTicket, getNextTicket } = useContext(GlobalContext)

    const { FailedAlert } = useAlert()

    async function handleNextTicket() {
        if (lastTicket) {
            return FailedAlert("Finaliza o atendimento atual")
        }

        getNextTicket()
    }

    return (
        <footer className="min-h-20 h-20 flex items-center justify-center px-4 bg-gray-100">
            <Button type="button" variant="primary" onClick={handleNextTicket}>
                <BellRing /> Chamar próximo
            </Button>
        </footer>
    );
}

export default Footer;