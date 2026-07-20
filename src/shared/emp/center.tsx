import Sidebar from "./sidebar";
import { useContext } from "react";
import { GlobalContext } from "../../context/global-context";
import authApi from "../../server/api";
import { Button } from "@/components/ui/button";
import { BellRing, Check, CornerUpLeft, CornerUpRight, X } from "lucide-react";
import { useAlert } from "@/provider/alert";
import axios from "axios";

const Center = () => {
    const { lastTicket, setLastTicket, voice } = useContext(GlobalContext)

    const { FailedAlert, SuccessAlert } = useAlert()

    async function handleFinished() {
        if (!lastTicket) {
            return FailedAlert("Nenhuma senha em atendimento")
        }

        try {
            const response = await authApi.patch("ticket/finish")

            SuccessAlert(response?.data.message)

            setLastTicket(undefined)
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

    function handleVoice() {
        if (!lastTicket) {
            return FailedAlert("Nenhuma senha em atendimento")
        }

        lastTicket  && voice(lastTicket.reference, lastTicket?.counter)
    }

    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-[384px_1fr] gap-4 px-4 overflow-x-auto">
            <Sidebar />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full flex flex-col items-center justify-center gap-2 text-brand-secondary">
                    <strong className="text-2xl text-center">{lastTicket ? "Senha " + lastTicket.reference : "0"}</strong>
                    <p className="text-xl">Senha atual</p>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <Button type="button" variant="primary" className="max-w-48 w-full" onClick={handleVoice}>
                        <BellRing /> Chamar novamente
                    </Button>
                    <Button type="button" variant="primary" className="max-w-48 w-full" onClick={() => handleFinished()}>
                        <Check /> Finalizar
                    </Button>
                    <Button type="button" variant="primary" className="max-w-48 w-full">
                        <CornerUpLeft /> Voltar para fila
                    </Button>
                    <Button type="button" variant="primary" className="max-w-48 w-full">
                        <CornerUpRight /> Transferir
                    </Button>
                    <Button type="button" variant="primary" className="max-w-48 w-full">
                        <X /> Não compareceu
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Center;