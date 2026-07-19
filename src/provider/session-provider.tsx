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
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    /* USER DATA */
    const getUser = useCallback(async () => {
        try {
            const response = await authApi.get('user')
            setUser(response.data)

            if (response.data.role == "SU" || response.data.role == "Admin") {
                return navigate("/admin")
            }

            return navigate("/counter")
        } catch {
            setUser(undefined)
            return navigate("/sign-in")
        }
        finally {
            setLoading(false)
        }
    }, [navigate])

    /* SESSION LOAD */
    useEffect(() => {
        async function loadSession() {
            const token = Cookies.get("gs-token");

            if (token || !token) {
                try {
                    const response = await authApi.get('user')
                    setUser(response.data)
                } catch {
                    setUser(undefined)
                }
                finally {
                    setLoading(false)
                }
            } else {
                setUser(undefined)
                setLoading(false)
            }

        }

        loadSession()
    }, [])

    /* SESSION LOGIN */
    const login = useCallback(async (email: string, password: string, setDisabledButton: (data: boolean) => void) => {
        setDisabledButton(true)

        try {
            const response = await Api.post("login", {
                email,
                password
            })

            Cookies.set("gs-token", response?.data.token)

            SuccessAlert(response?.data.message)

            getUser()
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
    }, [getUser, navigate])

    /* SESSION LOGOUT */
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
        user,
        loading
    }
}

export default SessionProvider;