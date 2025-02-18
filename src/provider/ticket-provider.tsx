import { useCallback, useState } from "react"
import { Api } from "../server/api"
import { ITicket } from "../interface/ITicket"

const TicketProvider = () => {
    const [ actTicket, setActTicket ] = useState<ITicket | undefined>()
    const [ countTicket, setCountTicket ] = useState("")

    const [ listTicket, setListTicket ] = useState<ITicket[]>()
    const [ listAllTicket, setListAllTicket ] = useState<ITicket[]>()

    const getListTicket = useCallback( async(service: string, actCompany: string) => {
        await Api.get(`ticket-view/${service}/${actCompany}`)
        .then((response) =>{
            setListTicket(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getListAllTicket = useCallback( async(actCompany: string) => {
        await Api.get(`ticket-view-all/${actCompany}`)
        .then((response) =>{
            setListAllTicket(response?.data)
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

    const getActTicket = useCallback( async(assistant: string) => {
        await Api.get(`ticket-call-current/${assistant}`)
        .then((response) =>{
            setActTicket(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getCountTicket = useCallback( async(actCompany: string) => {
        await Api.get(`ticket-count/${actCompany}`)
        .then((response) =>{
            setCountTicket(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    return {
        actTicket,
        countTicket,
        listTicket,
        listAllTicket,
        setActTicket,
        getActTicket,
        getListTicket,
        getCountTicket,
        getListAllTicket,
        getListLastTicket
    }
}
 
export default TicketProvider;