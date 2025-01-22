import { useCallback, useEffect, useState } from "react"
import { Api } from "../server/api"
import { IAdmin } from "../interface/IAdmin"
import ExtraProvider from "./extra-provider"

const SessionProvider = () => {
    const { setTextAlert, setTypeAlert } = ExtraProvider()
    
    const [ admin, setAdmin] = useState<IAdmin>()

    const [ actAdmin, setActAdmin] = useState<string | null>()

    const [ logado, setLogado] = useState<boolean>(false)

    /* ADMIN DATA */
    const getAdmin = useCallback(async () => {
        setActAdmin(localStorage.getItem("actAdmin"))

        await Api.get(`admin-show/${actAdmin}`)
            .then((response) => {
                setAdmin(response?.data)
                console.log(response?.data)
            })
            .catch(erro => {
                console.log(erro)
            })
    }, [actAdmin])

    /* SESSION LOAD */
    useEffect(() => {
        setActAdmin(localStorage.getItem("actAdmin"))

        if (actAdmin) {
            loadAdmin()
        }
        else {
            setLogado(false)
        }

        async function loadAdmin() {
            await Api.get(`admin-show/${actAdmin}`)
                .then(response => {
                    setAdmin(response?.data)
                    setLogado(true)
                })
                .catch(err => {
                    console.log(err)
                    setLogado(false)
                })
        }
    }, [actAdmin])

    /* SESSION LOGIN */
    const login = useCallback(async (email: string, password: string, setBtnDisabled: (data: boolean) => void) => {
        setBtnDisabled(true)
        
        await Api.post("admin-signin", {
            email,
            password
        })
        .then((response) => {
            localStorage.setItem("actAdmin", response?.data.admin?.id)

            setTextAlert(response?.data.message)
            setTypeAlert(true)
            getAdmin()

            setBtnDisabled(false)
        })
        .catch((erro) => {
            setTextAlert(erro?.response.data.message)
            setTypeAlert(false)
            setBtnDisabled(false)
        })
    }, [getAdmin, setTextAlert, setTypeAlert])

    /* SESSION LOGOUT */
    const logout = () => {

        setAdmin(undefined)

        setLogado(false)

        localStorage.removeItem("actAdmin")
    }

    return {
        logado,
        login,
        logout,
        admin,
        setAdmin,
        actAdmin,
        getAdmin
    }
}

export default SessionProvider;