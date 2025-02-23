import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser } from "./http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./hooks/use-toast";
import { useEffect, useState } from "react";
import useTokenStore from "./store";

const App = () => {
    const { isAuthenticated, loginWithRedirect, isLoading, user, getAccessTokenSilently  } = useAuth0();
    const queryClient = useQueryClient();
    const [hasCalledCreateUser, setHasCalledCreateUser] = useState(false);
    const setToken = useTokenStore((state) => state.setToken);
   
    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            // console.log("User created successfully");
        },
        onError: (error: any) => {
            if (error.response?.status === 500) {
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            }
        },
    });

    useEffect(() => {
        if (isAuthenticated && user && !hasCalledCreateUser) {
            const formData = new FormData();
            formData.append("name", user.nickname || "");
            formData.append("email", user.email || "");

            mutation.mutate(formData);
            setHasCalledCreateUser(true); // Prevent further calls
        }
        fetchToken();

    }, [isAuthenticated, user, hasCalledCreateUser, mutation, getAccessTokenSilently]);

    const fetchToken = async () => {
        if (isAuthenticated) {
            try {
                const token = await getAccessTokenSilently();
                setToken(token); // Store the token in Zustand
                // console.log("Auth0 Access Token:", token);
            } catch (error) {
                console.error("Error fetching token:", error);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        localStorage.setItem("redirect_url",window.location.pathname)
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
