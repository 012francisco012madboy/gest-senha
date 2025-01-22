import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rotas from './routes/rotas'
import AuthProvider from './context/auth-provider'
import GlobalProvider from './context/global-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <Rotas/>
      </GlobalProvider>
    </AuthProvider>
  </StrictMode>,
)
