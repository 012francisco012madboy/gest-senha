import { useCallback, useState } from "react"
import { IUser } from "../interface/IUser"
import { Api } from "../server/api"

const UserProvider = () => {
    /* USER DATA */
    const [ listUser, setListUser ] =  useState<IUser[]>([])
    const [ countUser, setCountUser ] =  useState("")

    const getListUser = useCallback( async(actCompany: string) => {
        await Api.get(`user-view/${actCompany}`)
        .then((response) =>{
            setListUser(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getCountUser = useCallback( async(actCompany: string) => {
        await Api.get(`user-count/${actCompany}`)
        .then((response) =>{
            setCountUser(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getEachUser = useCallback( async(id: string, setEachUser: (data: IUser) => void) => {
        await Api.get(`user-show/${id}`)
        .then((response) =>{
            setEachUser(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    return {
        listUser,
        getListUser,
        countUser,
        getCountUser,
        getEachUser
    }
}
 
export default UserProvider;