import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import Profile from "./pages/Profile.tsx";
import App from "./App.tsx";

const queryClient = new QueryClient();

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain || ""}
      clientId={clientId || ""}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App/>
        {/* <RouterProvider router={router} /> */}
      </QueryClientProvider>
      {/* <SignInPage/> */}
      {/* <Profile/> */}
    </Auth0Provider>
  </React.StrictMode>
);
