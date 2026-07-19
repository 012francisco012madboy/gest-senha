import { ICount } from "@/interface/ICount"
import authApi from "@/server/api"
import { useCallback, useState } from "react"

const ExtraProvider = () => {
    const [count, setCount] = useState<ICount>()

    const getCount = useCallback(async () => {
        try {
            const response = await authApi.get("count");
            setCount(response.data);
        } catch (error) {
            setCount(undefined);
        }
    }, [])

    function voice(ticket: string, counter: string) {
        if ("speechSynthesis" in window) {
            const text = `A seguir... Senha ${ticket}... Balcão ${counter}.`

            const value = new SpeechSynthesisUtterance(text)

            window.speechSynthesis.speak(value)
        }
    }

    return {
        voice,
        count,
        getCount
    }
}

export default ExtraProvider;