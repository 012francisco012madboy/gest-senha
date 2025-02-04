import { useCallback, useState } from "react"
import { Api } from "../server/api"
import { ITicket } from "../interface/ITicket"

const TicketProvider = () => {
    const [ actTicket, setActTicket ] = useState<ITicket | null>()

    const getListTicket = useCallback( async(service: string, actCompany: string, setListTicket: (data: ITicket[]) => void) => {
        await Api.get(`ticket-view/${service}/${actCompany}`)
        .then((response) =>{
            setListTicket(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getListAllTicket = useCallback( async(actCompany: string, setListTicket: (data: ITicket[]) => void) => {
        await Api.get(`ticket-view-all/${actCompany}`)
        .then((response) =>{
            setListTicket(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getListLastTicket = useCallback( async(actCompany: string, setTicket: (data: ITicket) => void) => {
        await Api.get(`ticket-view-last/${actCompany}`)
        .then((response) =>{
            setTicket(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getNextTicket = useCallback( async(service: string, assistant: string) => {
        await Api.get(`ticket-call-next/${service}/${assistant}`)
        .then((response) =>{
            setActTicket(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    return {
        actTicket,
        setActTicket,
        getListTicket,
        getListAllTicket,
        getListLastTicket,
        getNextTicket
    }
}
 
export default TicketProvider;