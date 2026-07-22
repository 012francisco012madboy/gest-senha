import { useCallback, useState } from "react"
import authApi from "../server/api"
import { IService } from "@/interface/IService"

const ServiceProvider = () => {
    const [listService, setListService] = useState<IService[]>()

    const getListService = useCallback(async () => {
        try {
            const response = await authApi.get("service")
            setListService(response?.data)
        }
        catch (e) {
            setListService(undefined)
        }
    }, [])

    const getListServiceActive = useCallback(async () => {
        try {
            const response = await authApi.get("service/active")
            setListService(response?.data)
        }
        catch (e) {
            setListService(undefined)
        }
    }, [])

    return {
        listService,
        getListService,
        getListServiceActive
    }
}

export default ServiceProvider;