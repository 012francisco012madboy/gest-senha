import { useCallback, useState } from "react"
import { Api } from "../server/api"
import { IDefault } from "../interface/IDefault"

const ServiceProvider = () => {
    /* SERVICE DATA */
    const [ listService, setListService ] =  useState<IDefault[]>([])
    const [ countService, setCountService ] =  useState("")

    const getListService = useCallback( async(actCompany: string) => {
        await Api.get(`service-view/${actCompany}`)
        .then((response) =>{
            setListService(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getListActiveService = useCallback( async(actCompany: string) => {
        await Api.get(`service-available/${actCompany}`)
        .then((response) =>{
            setListService(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getCountService = useCallback( async(actCompany: string) => {
        await Api.get(`service-count/${actCompany}`)
        .then((response) =>{
            setCountService(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getEachService = useCallback( async(id: string, setEachService: (data: IDefault) => void) => {
        await Api.get(`service-show/${id}`)
        .then((response) =>{
            setEachService(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    return {
        listService,
        getListService,
        countService,
        getCountService,
        getEachService,
        getListActiveService
    }
}
 
export default ServiceProvider;