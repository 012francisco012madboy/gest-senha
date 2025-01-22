import { useCallback, useState } from "react"
import { IAdmin } from "../interface/IAdmin"
import { Api } from "../server/api"

const AdminProvider = () => {
    /* ADMIN DATA */
    
    const [ listAdmin, setListAdmin ] =  useState<IAdmin[]>([])
    const [ countAdmin, setCountAdmin ] =  useState("")

    const getListAdmin = useCallback( async() => {
        await Api.get(`admin-view`)
        .then((response) =>{
            setListAdmin(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getCountAdmin = useCallback( async() => {
        await Api.get(`admin-count`)
        .then((response) =>{
            setCountAdmin(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    return {
        listAdmin,
        getListAdmin,
        countAdmin,
        getCountAdmin
    }
}
 
export default AdminProvider;