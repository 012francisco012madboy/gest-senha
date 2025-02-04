import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rotas from './routes/rotas'
import AuthProvider from './context/auth-provider'
import GlobalProvider from './context/global-provider'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GlobalProvider>
          <Rotas/>
        </GlobalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
