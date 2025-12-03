import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FusionAuthProvider, FusionAuthProviderConfig } from '@fusionauth/react-sdk'
import App from './App'
import './index.css'

const config: FusionAuthProviderConfig = {
  clientId: "3439f478-1947-4c0b-bb61-7fdc4f3b6a43",
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
        <App />
      </FusionAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
