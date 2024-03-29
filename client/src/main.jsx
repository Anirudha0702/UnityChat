import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { fetchEmojis } from './utils/Emojis.js'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import ScreenWidthProvider from './Providers/ScreenWidthProvider.jsx'
import  ChatContextProvider  from './Providers/ChatContextProvider.jsx'
import { AuthProvider } from './Providers/AuthProvider.jsx'
const queryClient =new QueryClient();
fetchEmojis();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ChatContextProvider >
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ScreenWidthProvider>
              <App />
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </ScreenWidthProvider>
          </QueryClientProvider>
        </AuthProvider>
      </ChatContextProvider>
  </React.StrictMode>
)
