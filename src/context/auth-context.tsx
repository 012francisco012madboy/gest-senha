import { createContext} from "react"
import { IUser } from "../interface/IUser"
import { IDefault } from "../interface/IDefault"
import { IUserAssistant } from "../interface/IUserAssistant"

interface AuthContextData{
  /* DEFAULT */
  voice: (ticket: string, counter: string) => void
  name_company: string | undefined
  setNameCompany: (data: string) => void
  email_company: string | undefined
  setEmailCompany: (data: string) => void
  counter: IDefault
  setCounter: (data: IDefault) => void
  textAlert: string | undefined
  setTextAlert: (data: string) => void
  textQuestion: string | undefined
  setTextQuestion: (data: string) => void
  typeAlert: boolean
  setTypeAlert: (data: boolean) => void
  showModal: string | null
  setShowModal: (data: string | null) => void

  /* SESSION */
  logado: boolean
  login:(email: string, password:string, setBtnDisabled: (data: boolean) => void) => void
  logout:() => void
  getUser:() => void
  getUserAssistant:() => void
  user: IUser | undefined
  setUser: (data: IUser) => void
  actUser: string | null | undefined
  actCompany: string | null | undefined
  actUserAssistant: IUserAssistant | undefined
}

export const AuthContext = createContext({} as AuthContextData)