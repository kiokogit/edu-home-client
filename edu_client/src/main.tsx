import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FusionAuthProvider, FusionAuthProviderConfig } from '@fusionauth/react-sdk'
import App from './App'
import './index.css'
import { HeaderTitleProvider } from './contexts/HeaderTitleContext'

const config: FusionAuthProviderConfig = {
  clientId: "a7168d85-038e-4a99-9acb-a9aa2ded0283",
  redirectUri: "http://localhost:3000",
  postLogoutRedirectUri: "http://localhost:3000",
  serverUrl: "http://localhost:9011",
  shouldAutoFetchUserInfo: true,
  shouldAutoRefresh: true,
  onRedirect: (state?: string) => {
    console.log(`Redirect happened with state value: ${state}`);
  },
  scope: 'openid email profile offline_access'
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FusionAuthProvider {...config}>
        <HeaderTitleProvider>
          <App />
        </HeaderTitleProvider>
      </FusionAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
