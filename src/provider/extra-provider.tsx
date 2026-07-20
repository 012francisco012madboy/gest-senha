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

    return {
        count,
        getCount
    }
}

export default ExtraProvider;