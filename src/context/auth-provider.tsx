import { ReactNode } from "react"
import { AuthContext } from "./auth-context"
import ExtraProvider from "../provider/extra-provider"

interface ContextProps{
  children: ReactNode
}

function AuthProvider({children} : ContextProps){

  /* PROVIDER */
  const { textAlert, typeAlert, setTextAlert, setTypeAlert, showModal, setShowModal } = ExtraProvider()

  return(
    <AuthContext.Provider value={{
      /* DEFAULT */
      textAlert, setTextAlert,
      typeAlert, setTypeAlert,
      showModal, setShowModal
    }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider