import { useCallback, useState } from "react"
import authApi from "../server/api"
import { ITicket } from "../interface/ITicket"

const TicketProvider = () => {
    // const [ ticket, setTicket ] = useState<ITicket>()

    const [ listTicket, setListTicket ] = useState<ITicket[]>()

    const getListTicket = useCallback( async() => {
        try {
            const response = await authApi.get("ticket")
            setListTicket(response?.data)
        }
        catch (e) {
            setListTicket(undefined)
        }
    }, [])

    return {
        listTicket,
        getListTicket
    }
}
 
export default TicketProvider;