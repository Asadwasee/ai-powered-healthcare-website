import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {AppRoutes} from './routes/AppRoutes'
import { GlobalStateProvider } from './context/GlobalStateContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStateProvider>
      <AppRoutes />
    </GlobalStateProvider>
  </StrictMode>,
)
