import { ReactNode } from "react"
import { AuthContext } from "./auth-context"
import ExtraProvider from "../provider/extra-provider"
import SessionProvider from "../provider/session-provider"

interface ContextProps{
  children: ReactNode
}

function AuthProvider({ children } : ContextProps){

  /* PROVIDER */
  const { voice, counter, setCounter, textQuestion, setTextQuestion, textAlert, typeAlert, setTextAlert, setTypeAlert, showModal, setShowModal, name_company, setNameCompany, email_company, setEmailCompany } = ExtraProvider()
  const { actUser, user, getUser, logado, login, logout, setUser, actCompany, actUserAssistant, getUserAssistant } = SessionProvider()

  return(
    <AuthContext.Provider value={{
      /* DEFAULT */
      voice,
      counter, setCounter,
      textAlert, setTextAlert,
      textQuestion, setTextQuestion,
      typeAlert, setTypeAlert,
      showModal, setShowModal,
      name_company, setNameCompany,
      email_company, setEmailCompany,

      /* AUTH */
      user, setUser,
      login, logout,
      actUser, getUser,
      logado, actCompany,
      getUserAssistant, actUserAssistant
    }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider