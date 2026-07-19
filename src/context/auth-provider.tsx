import { ReactNode } from "react"
import { AuthContext } from "./auth-context"
import SessionProvider from "../provider/session-provider"

interface ContextProps {
  children: ReactNode
}

function AuthProvider({ children }: ContextProps) {
  const { login, logout, user, loading } = SessionProvider()

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider