import { createContext} from "react"
import { IUser } from "../interface/IUser"

interface AuthContextData{
  login:(email: string, password:string, setDisabledButton: (data: boolean) => void) => void
  logout:() => void
  user: IUser | undefined
  loading: boolean
}

export const AuthContext = createContext({} as AuthContextData)