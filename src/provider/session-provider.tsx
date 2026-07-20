import { useCallback, useEffect, useState } from "react"
import authApi, { Api } from "../server/api"
import { IUser } from "../interface/IUser"
import { useNavigate } from "react-router-dom"
import { useAlert } from "./alert"
import axios from "axios"
import Cookies from "js-cookie"

const SessionProvider = () => {
    const { FailedAlert, SuccessAlert } = useAlert()

    const [user, setUser] = useState<IUser>()
    const [logado, setLogado] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    
    useEffect(() => {
        async function loadSession() {
            const token = Cookies.get("gs-token");

            if (token || !token) {
                try {
                    const response = await authApi.get('user')
                    setUser(response.data)
                    setLogado(true)
                } catch {
                    setUser(undefined)
                    setLogado(false)
                }
                finally {
                    setLoading(false)
                }
            } else {
                setUser(undefined)
                setLoading(false)
                setLogado(false)
            }

        }

        loadSession()
    }, [])
    
    const loadUser = useCallback(async () => {
        try {
            const response = await authApi.get('user')
            setUser(response.data)

            setLogado(true)

            if (response.data.role == "SU" || response.data.role == "Admin") {
                return navigate("/admin")
            }

            return navigate("/counter")
        } catch {
            setLogado(false)
            setUser(undefined)
            return navigate("/sign-in")
        }
        finally {
            setLoading(false)
        }
    }, [navigate])
    
    const login = useCallback(async (email: string, password: string, setDisabledButton: (data: boolean) => void) => {
        setDisabledButton(true)

        try {
            const response = await Api.post("login", {
                email,
                password
            })

            Cookies.set("gs-token", response?.data.token)

            SuccessAlert(response?.data.message)

            loadUser()
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                FailedAlert(e?.response?.data.message || "Erro inesperado")
            }
            else {
                FailedAlert("Erro inesperado")
            }
        }
        finally {
            setDisabledButton(false)
        }
    }, [loadUser, navigate])
    
    const logout = async () => {
        setUser(undefined)
        setLoading(true)
        try {
            await authApi.post('user/out')
            Cookies.remove("gs-token")
            navigate("/sign-in")
        }
        catch (e) {
            FailedAlert("Erro ao terminar sessão")
        }
        finally {
            setLoading(false)
        }
    }

    return {
        login,
        logout,
        loadUser,
        setUser,
        user,
        logado,
        loading
    }
}

export default SessionProvider;