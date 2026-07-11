import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRoutes } from './routes/AppRoutes'
import { GlobalStateProvider } from './context/GlobalStateContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStateProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </GlobalStateProvider>
  </StrictMode>,
)