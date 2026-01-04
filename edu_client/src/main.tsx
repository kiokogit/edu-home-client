import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { HeaderTitleProvider } from './contexts/HeaderTitleContext'
import { AuthProvider } from './Providers'


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HeaderTitleProvider>
          <App />
        </HeaderTitleProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
