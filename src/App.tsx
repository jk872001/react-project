import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

    if (isLoading) {
        // Show a loading state while Auth0 is determining the authentication status
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // Redirect to login only if the user is not authenticated and Auth0 is ready
        loginWithRedirect();
        return null; // Prevent rendering during the redirect
    }

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
