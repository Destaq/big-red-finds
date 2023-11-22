"use client";

import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from "../../../commons/types";
import { CircularProgress } from "@mui/material";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false); // Set loading to false once user is set.
        });
    }, [auth]);

    if (loading) {
        // Show loading spinner while determining the authentication status.
        // Use a div to center the spinner
        return (
            <div style={{ display: 'flex', width: "100%", height: "100vh", justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <CircularProgress />
            </div>
        );
    }

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
