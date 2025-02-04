import { useCallback, useState } from "react"
import { Api } from "../server/api"
import { ICounter } from "../interface/ICounter"

const CounterProvider = () => {
    /* SERVICE DATA */
    const [ listCounter, setListCounter ] =  useState<ICounter[]>([])
    const [ countCounter, setCountCounter ] =  useState("")

    const getListCounter = useCallback( async(actCompany: string) => {
        await Api.get(`counter-view/${actCompany}`)
        .then((response) =>{
            setListCounter(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getListCounterActive = useCallback( async(actCompany: string) => {
        await Api.get(`front-desk-view/${actCompany}`)
        .then((response) =>{
            setListCounter(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getCountCounter = useCallback( async(actCompany: string) => {
        await Api.get(`counter-count/${actCompany}`)
        .then((response) =>{
            setCountCounter(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getEachCounter = useCallback( async(id: string, setEachCounter: (data: ICounter) => void) => {
        await Api.get(`counter-show/${id}`)
        .then((response) =>{
            setEachCounter(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    return {
        listCounter,
        getListCounter,
        countCounter,
        getCountCounter,
        getEachCounter,
        getListCounterActive
    }
}
 
export default CounterProvider;