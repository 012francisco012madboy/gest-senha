import Sidebar from "./sidebar";
import { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/global-context";
import authApi from "../../server/api";
import { Button } from "@/components/ui/button";
import { BellRing, Check, CornerUpLeft, CornerUpRight, X } from "lucide-react";
import { useAlert } from "@/provider/alert";
import axios from "axios";
import Cookies from "js-cookie";
import { ITicket } from "@/interface/ITicket";
import { toast } from "sonner";
import TransfertTicketModal from "@/components/modal/transfert-ticket-modal";

const Center = () => {
    const { lastTicket, setLastTicket, voice } = useContext(GlobalContext)

    const { FailedAlert } = useAlert()

    const [openTransfertTicket, setOpenTransfertTicket] = useState(false)

    useEffect(() => {
        const last = Cookies.get("gs-last-ticket");

        if (last) {
            const ticket: ITicket = JSON.parse(last);
            setLastTicket(ticket);
        }
    })

    function handleVoice() {
        if (!lastTicket) {
            return FailedAlert("Nenhuma senha em atendimento")
        }

        lastTicket && voice(lastTicket.reference, lastTicket?.counter)
    }

    async function handleFinished() {
        if (!lastTicket) {
            return FailedAlert("Nenhuma senha em atendimento")
        }

        try {
            toast.promise(authApi.patch("ticket/finish"),
                {
                    loading: "Processando",
                    success: (res) => {
                        setLastTicket(undefined)
                        Cookies.remove("gs-last-ticket")
                        return res?.data.message
                    },
                    error: (e) => e?.response?.data.message || "Erro inesperado"
                }
            )
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

    async function handleReturned() {
        if (!lastTicket) {
            return FailedAlert("Nenhuma senha em atendimento")
        }

        try {
            toast.promise(authApi.patch("ticket/returned"),
                {
                    loading: "Processando",
                    success: (res) => {
                        setLastTicket(undefined)
                        Cookies.remove("gs-last-ticket")
                        return res?.data.message
                    },
                    error: (e) => e?.response?.data.message || "Erro inesperado"
                }
            )
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

    async function handleTransfert() {
        if (!lastTicket) {
            return FailedAlert("Nenhuma senha em atendimento")
        }

        setOpenTransfertTicket(true)
    }

    async function handleAbsent() {
        if (!lastTicket) {
            return FailedAlert("Nenhuma senha em atendimento")
        }

        try {
            toast.promise(authApi.patch("ticket/absent"),
                {
                    loading: "Processando",
                    success: (res) => {
                        setLastTicket(undefined)
                        Cookies.remove("gs-last-ticket")
                        return res?.data.message
                    },
                    error: (e) => e?.response?.data.message || "Erro inesperado"
                }
            )
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
        <Fragment>
            {openTransfertTicket && <TransfertTicketModal open={openTransfertTicket} setOpen={setOpenTransfertTicket}/>}
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
                        <Button type="button" variant="primary" className="max-w-48 w-full" onClick={() => handleReturned()}>
                            <CornerUpLeft /> Voltar para fila
                        </Button>
                        <Button type="button" variant="primary" className="max-w-48 w-full" onClick={() => handleTransfert()}>
                            <CornerUpRight /> Transferir
                        </Button>
                        <Button type="button" variant="primary" className="max-w-48 w-full" onClick={() => handleAbsent()}>
                            <X /> Não compareceu
                        </Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Center;