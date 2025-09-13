// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router"
import router from './router/router.tsx'
import './index.css'
import store from './redux/store'
import { persistor } from './redux/store'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react';
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
  domain={import.meta.env.VITE_AUTH0_DOMAIN}
  clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
  authorizationParams={{ redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI }}
  cacheLocation="localstorage"
>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}/>
    </PersistGate>
  </Provider>
</Auth0Provider>
)
