import { useCallback, useEffect, useState } from "react"
import { Api } from "../server/api"
import { IUser } from "../interface/IUser"
import ExtraProvider from "./extra-provider"
import { useNavigate } from "react-router-dom"
import { IUserAssistant } from "../interface/IUserAssistant"
import { useAlert } from "./alert"
import axios from "axios"

const SessionProvider = () => {
    const { setTextAlert, setTypeAlert } = ExtraProvider()

    const { FailedAlert, SuccessAlert } = useAlert()

    const [user, setUser] = useState<IUser>()

    const [actUser, setActUser] = useState<string | null>()
    const [actUserAssistant, setActUserAssistant] = useState<IUserAssistant>()
    const [actCompany, setActCompany] = useState<string | null>()

    const [logado, setLogado] = useState<boolean>(false)

    const navigate = useNavigate()

    /* USER DATA */
    const getUser = useCallback(async () => {
        await Api.get(`user-show/${actUser}`)
            .then((response) => {
                setUser(response?.data)
                setLogado(true)
            })
    }, [])

    /* USER ASSISTANT DATA */
    const getUserAssistant = useCallback(async () => {

        if (localStorage.getItem("actAssitant") && localStorage.getItem("actCounter")) {
            await Api.get(`user-assistant-view/${localStorage.getItem("actAssitant")}/${localStorage.getItem("actCounter")}`)
                .then((response) => {
                    setActUserAssistant(response?.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            navigate("/counter")
        }

    }, [])

    /* SESSION LOAD */
    useEffect(() => {
        if (!actUser) {
            setActUser(localStorage.getItem("actUser"))
        }

        if (actUser) {
            loadUser()
        }
        else {
            setLogado(false)
        }

        async function loadUser() {
            await Api.get(`user-show/${actUser}`)
                .then(response => {
                    setUser(response?.data)
                    setLogado(true)

                    setActCompany(response?.data.id_company)
                })
                .catch(() => {
                    setLogado(false)
                })
        }
    }, [actUser])

    /* SESSION LOGIN */
    const login = useCallback(async (email: string, password: string, setDisabledButton: (data: boolean) => void) => {
        setDisabledButton(true)

        try {
            const response = await Api.post("user-signin", {
                email,
                password
            })

            localStorage.setItem("actUser", response?.data.user?.id)

            setActUser(response?.data.user?.id)

            SuccessAlert(response?.data.message)

            getUser()

            
            return response?.data.user?.idType == "1" ? navigate("/admin") :
            response?.data.user?.idType == "2" ? navigate("/counter") : ""
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                FailedAlert(e?.response?.data.message || "Erro inesperado")
            }
            else {
                FailedAlert("Erro inesperado")
            }
        }
        finally{
            setDisabledButton(false)
        }
    }, [getUser, setTextAlert, setTypeAlert, navigate])

    /* SESSION LOGOUT */
    const logout = () => {
        setUser(undefined)

        setLogado(false)

        localStorage.removeItem("actUser")

        localStorage.removeItem("actAssitant")
        localStorage.removeItem("actCounter")
    }

    return {
        logado,
        login,
        logout,
        user,
        setUser,
        actUser,
        getUser,
        actCompany,
        getUserAssistant,
        actUserAssistant
    }
}

export default SessionProvider;