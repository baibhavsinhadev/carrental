import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { OwnerProvider } from './context/OwnerContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <UserProvider>
        <OwnerProvider>
          <App />
        </OwnerProvider>
      </UserProvider>
    </AppProvider>
  </BrowserRouter>,
)
