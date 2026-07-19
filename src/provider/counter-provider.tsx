import { useCallback, useState } from "react"
import authApi from "../server/api"
import { ICounter } from "../interface/ICounter"

const CounterProvider = () => {
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

    return {
        listCounter,
        getListCounter,
        getListCounterActive
    }
}

export default CounterProvider;