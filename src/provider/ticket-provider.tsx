import { useCallback, useState } from "react"
import authApi from "../server/api"
import { ITicket } from "../interface/ITicket"
import axios from "axios"
import { useAlert } from "./alert"
import Cookies from "js-cookie"
import { toast } from "sonner"

const TicketProvider = () => {
    const { FailedAlert, SuccessAlert } = useAlert()

    const [lastTicket, setLastTicket] = useState<ITicket>()
    const [listTicket, setListTicket] = useState<ITicket[]>()
    const [listCounterTicket, setListCounterTicket] = useState<ITicket[]>()

    function voice(ticket: string, counter: string) {
        if ("speechSynthesis" in window) {
            const text = `A seguir... Senha ${ticket}... Balcão ${counter}.`

            const value = new SpeechSynthesisUtterance(text)

            window.speechSynthesis.speak(value)
        }
    }

    const getListTicket = useCallback(async () => {
        try {
            const response = await authApi.get("ticket")
            setListTicket(response?.data)
        }
        catch (e) {
            setListTicket(undefined)
        }
    }, [])

    const getLastTicket = useCallback(async () => {
        try {
            const response = await authApi.get("ticket/last")
            setLastTicket(response?.data)
        }
        catch (e) {
            setLastTicket(undefined)
        }
    }, [])

    const getListCounterTicket = useCallback(async () => {
        try {
            const response = await authApi.get("ticket/counter")
            setListCounterTicket(response?.data)
        }
        catch (e) {
            setListCounterTicket(undefined)
        }
    }, [])

    const getNextTicket = useCallback(async () => {
        try {
            toast.promise(authApi.get("ticket/next"),
                {
                    loading: "Chamando",
                    success: (res) => {
                        SuccessAlert("Senha para atendimento: " + res?.data?.reference)
                        const ticket: ITicket = res?.data;

                        setLastTicket(ticket)
                        Cookies.set("gs-last-ticket", JSON.stringify(ticket), { expires: 1 });

                        voice(res?.data?.reference, res?.data?.counter)
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
    }, [])

    return {
        voice,
        lastTicket,
        listTicket,
        listCounterTicket,
        setLastTicket,
        getNextTicket,
        getListTicket,
        getLastTicket,
        getListCounterTicket,
    }
}

export default TicketProvider;