import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rotas from './routes/rotas'
import AuthProvider from './context/auth-provider'
import GlobalProvider from './context/global-provider'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AlertProvider } from './provider/alert'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors position="top-center" />

    <AlertProvider>
      <BrowserRouter>
        <AuthProvider>
          <GlobalProvider>
            <Rotas />
          </GlobalProvider>
        </AuthProvider>
      </BrowserRouter>
    </AlertProvider>
  </StrictMode>,
)
