import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser } from "./http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./hooks/use-toast";
import { useEffect, useState } from "react";

const App = () => {
    const { isAuthenticated, loginWithRedirect, isLoading, user } = useAuth0();
    const queryClient = useQueryClient();
    const [hasCalledCreateUser, setHasCalledCreateUser] = useState(false);


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
    }, [isAuthenticated, user, hasCalledCreateUser, mutation]);

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
