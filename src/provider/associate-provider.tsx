import { useCallback, useState } from "react"
import authApi from "../server/api"
import { IAssociate } from "@/interface/IAssociate"

const AssociateProvider = () => {
    const [listAssociate, setListAssociate] = useState<IAssociate[]>()

    const getListAssociate = useCallback(async () => {
        try {
            const response = await authApi.get("counter/service")
            setListAssociate(response?.data)
        }
        catch (e) {
            setListAssociate(undefined)
        }
    }, [])

    return {
        listAssociate,
        getListAssociate
    }
}

export default AssociateProvider;