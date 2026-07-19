import { useCallback, useState } from "react"
import { IUser } from "../interface/IUser"
import authApi from "../server/api"

const UserProvider = () => {
    const [listUser, setListUser] = useState<IUser[]>()

    const getListUser = useCallback(async () => {
        try {
            const response = await authApi.get("user/list")
            setListUser(response?.data)
        }
        catch (e) {
            setListUser(undefined)
        }
    }, [])

    return {
        listUser,
        getListUser,
    }
}

export default UserProvider;