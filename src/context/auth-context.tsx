import { createContext} from "react"

interface AuthContextData{
  /* DEFAULT */
  textAlert: string | undefined
  setTextAlert: (data: string) => void
  typeAlert: boolean
  setTypeAlert: (data: boolean) => void
  showModal: string | null
  setShowModal: (data: string | null) => void
}

export const AuthContext = createContext({} as AuthContextData)