import { useCallback, useState } from "react"
import authApi from "../server/api"
import { ICounter } from "../interface/ICounter"

const CounterProvider = () => {
    const [counterOpen, setCounterOpen] = useState<ICounter>()
    const [listCounter, setListCounter] = useState<ICounter[]>()

    const getListCounter = useCallback(async () => {
        try {
            const response = await authApi.get("counter")
            setListCounter(response?.data)
        }
        catch (e) {
            setListCounter(undefined)
        }
    }, [])

    const getListCounterActive = useCallback(async () => {
        try {
            const response = await authApi.get("counter/active")
            setListCounter(response?.data)
        }
        catch (e) {
            setListCounter(undefined)
        }
    }, [])

    const getCounterOpen = useCallback(async () => {
        try {
            const response = await authApi.get("user/active")
            setCounterOpen(response?.data)
        }
        catch (e) {
            setCounterOpen(undefined)
        }
    }, [])

    return {
        counterOpen,
        listCounter,
        getCounterOpen,
        getListCounter,
        getListCounterActive
    }
}

export default CounterProvider;