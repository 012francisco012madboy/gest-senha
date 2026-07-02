import Sidebar from "./sidebar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { Api } from "../../server/api";
import { Button } from "@/components/ui/button";
import { BellRing, Check, CornerUpLeft, CornerUpRight, X } from "lucide-react";

const Center = () => {
    const { actCompany, setTextAlert, setTypeAlert, actUserAssistant, voice } = useContext(AuthContext)
    const { actTicket, setActTicket, getActTicket, getListTicket } = useContext(GlobalContext)

    useEffect(() => {
        actUserAssistant && getActTicket(actUserAssistant?.id_assistant)
    }, [actUserAssistant, getActTicket])

    function handleFinished(state: string) {
        if (actTicket && state) {
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

    function handleVoice() {
        actTicket && actUserAssistant && voice(actTicket.ref, actUserAssistant?.ref_counter)
    }

    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-[384px_1fr] gap-4 px-4 overflow-x-auto">
            <Sidebar />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full flex flex-col items-center justify-center gap-2 text-brand">
                    <strong className="text-2xl">{actTicket ? "Senha " + actTicket.ref : "0"}</strong>
                    <p className="text-xl">Senha atual</p>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <Button type="button" variant="primary" className="max-w-48 w-full" onClick={handleVoice}>
                        <BellRing /> Chamar novamente
                    </Button>
                    <Button type="button" variant="primary" className="max-w-48 w-full" onClick={() => handleFinished("4")}>
                        <CornerUpLeft /> Voltar para fila
                    </Button>
                    <Button type="button" variant="primary" className="max-w-48 w-full">
                        <CornerUpRight /> Transferir
                    </Button>
                    <Button type="button" variant="primary" className="max-w-48 w-full" onClick={() => handleFinished("6")}>
                        <Check /> Finalizar
                    </Button>
                    <Button type="button" variant="primary" className="max-w-48 w-full" onClick={() => handleFinished("5")}>
                        <X /> Não compareceu
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Center;