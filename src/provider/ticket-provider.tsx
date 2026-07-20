import { useCallback, useState } from "react"
import authApi from "../server/api"
import { ITicket } from "../interface/ITicket"

const TicketProvider = () => {
    const [ lastTicket, setLastTicket ] = useState<ITicket>()
    const [ listTicket, setListTicket ] = useState<ITicket[]>()
    const [ listCounterTicket, setListCounterTicket ] = useState<ITicket[]>()

    function voice(ticket: string, counter: string) {
        if ("speechSynthesis" in window) {
            const text = `A seguir... Senha ${ticket}... Balcão ${counter}.`

            const value = new SpeechSynthesisUtterance(text)

            window.speechSynthesis.speak(value)
        }
    }

    const getListTicket = useCallback( async() => {
        try {
            const response = await authApi.get("ticket")
            setListTicket(response?.data)
        }
        catch (e) {
            setListTicket(undefined)
        }
    }, [])

    const getLastTicket = useCallback( async() => {
        try {
            const response = await authApi.get("ticket/last")
            setLastTicket(response?.data)
        }
        catch (e) {
            setLastTicket(undefined)
        }
    }, [])

    const getListCounterTicket = useCallback( async() => {
        try {
            const response = await authApi.get("ticket/counter")
            setListCounterTicket(response?.data)
        }
        catch (e) {
            setListCounterTicket(undefined)
        }
    }, [])

    const getNextTicket = useCallback( async() => {
        try {
            const response = await authApi.get("ticket/next")
            setLastTicket(response?.data)
            voice(response?.data?.reference, response?.data?.counter)
        }
        catch (e) {
            setLastTicket(undefined)
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