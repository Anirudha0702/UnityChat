import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import  ChatContextProvider  from './Providers/ChatContextProvider.jsx'
import { AuthProvider } from './Providers/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ChatContextProvider >
        <AuthProvider>

        <App />
        </AuthProvider>
      </ChatContextProvider>
  </React.StrictMode>
)
