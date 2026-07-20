import { createContext} from "react"
import { IUser } from "../interface/IUser"

interface AuthContextData{
  login:(email: string, password:string, setDisabledButton: (data: boolean) => void) => void
  logout:() => void
  loadUser:() => void
  setUser: (data: IUser | undefined) => void
  user: IUser | undefined
  logado: boolean
  loading: boolean
}

export const AuthContext = createContext({} as AuthContextData)