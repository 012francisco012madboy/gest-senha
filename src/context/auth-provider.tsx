import { ReactNode } from "react"
import { AuthContext } from "./auth-context"
import SessionProvider from "../provider/session-provider"

interface ContextProps {
  children: ReactNode
}

function AuthProvider({ children }: ContextProps) {
  const { login, logout, loadUser, setUser, user, logado, loading } = SessionProvider()

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      loadUser,
      setUser,
      user,
      logado,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider