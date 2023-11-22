"use client";

import * as React from "react";
import { useState, useContext, useCallback } from "react";
import { UserContext } from "../app/UserProvider";
import InfoCard from "../components/InfoCard";
import { Avatar, Button, ButtonBase, Stack, Menu, MenuItem } from "@mui/material";
import MakeNewPost from "../components/MakeNewPost";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    Auth,
    signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../fb_setup";
import { User } from "../../../commons/types";

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export default function Home() {
    const [isCreateNewPostOpen, setIsCreateNewPostOpen] = useState(false);

    // Pull state from context.
    let user: User | null = (useContext(UserContext) as unknown) as User | null;

    const handleCreateNewPost = () => {
        if (!user) {
            alert("You must be logged in to create a new post!");
            return;
        }
        setIsCreateNewPostOpen(true);
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            // Will automatically be logged in.
        } catch (error) {
            console.log((error as any).message);
        }
    };

    const handleClose = () => {
        setIsCreateNewPostOpen(false);
    };

    const [anchorEl, setAnchorEl] = useState<
        (EventTarget & HTMLButtonElement) | null
    >(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = useCallback(() => {
        signOut(getAuth())
            .then(() => {
                // Sign-out successful.
                handleMenuClose();
            })
            .catch((error) => {
                // An error occurred.
                console.log(error);
            });
    }, [handleMenuClose]);

    return (
        <div>
            <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50">
                <div className="z-10">
                    <div className="bottom-6 right-24 position fixed">
                        <Button
                            variant="contained"
                            className={
                                user
                                    ? "bg-blue-700"
                                    : "!bg-blue-700 cursor-not-allowed"
                            }
                            onClick={handleCreateNewPost}
                        >
                            Create New Post
                        </Button>
                        {isCreateNewPostOpen && (
                            <MakeNewPost
                                open={isCreateNewPostOpen}
                                onClose={handleClose}
                            />
                        )}
                    </div>
                </div>

                <div className="relative grid grid-cols-3 gap-x-4 gap-y-8">
                    <div className="absolute -top-16 right-0">
                        {user ? (
                            // Show just the profile icon if user is logged in
                            <div>
                                <ButtonBase
                                    onClick={handleMenu}
                                    style={{ borderRadius: "50%" }}
                                >
                                    <Avatar
                                        alt={user.displayName}
                                        src={user.photoURL}
                                    />
                                </ButtonBase>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuClose}
                                    onClick={handleMenuClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: "visible",
                                            filter:
                                                "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                            mt: 1.5,
                                            "& .MuiAvatar-root": {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            "&:before": {
                                                content: '""',
                                                display: "block",
                                                position: "absolute",
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: "background.paper",
                                                transform: "rotate(45deg)",
                                                zIndex: 0,
                                            },
                                        },
                                        transformOrigin: "top right",
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "right",
                                        },
                                    }}
                                >
                                    <MenuItem onClick={handleLogout}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            // Show the login/register buttons if no user is logged in
                            <Stack spacing={2} direction="row">
                                <Button
                                    variant="outlined"
                                    color="success"
                                    onClick={signInWithGoogle}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    className="bg-green-700"
                                    onClick={signInWithGoogle}
                                >
                                    Register
                                </Button>
                            </Stack>
                        )}
                    </div>
                    <InfoCard
                        imageURL="https://m.media-amazon.com/images/I/41j7lA0rK5L._AC_UY1000_.jpg"
                        owner={{
                            displayName: "Nitya",
                            email: "nitya@cornell.edu",
                            photoURL: "",
                        }}
                        description="Found this let me know if you want it!!!"
                        datetime={new Date()}
                        found={true}
                    />
                    <InfoCard
                        imageURL="https://m.media-amazon.com/images/I/41j7lA0rK5L._AC_UY1000_.jpg"
                        owner={{
                            displayName: "Nitya",
                            email: "nitya@cornell.edu",
                            photoURL: "",
                        }}
                        description="Found this let me know if you want it!!!"
                        datetime={new Date()}
                        found={true}
                    />
                    <InfoCard
                        imageURL="https://m.media-amazon.com/images/I/41j7lA0rK5L._AC_UY1000_.jpg"
                        owner={{
                            displayName: "Nitya",
                            email: "nitya@cornell.edu",
                            photoURL: "",
                        }}
                        description="Found this let me know if you want it!!!"
                        datetime={new Date()}
                        found={false}
                    />
                    <InfoCard
                        imageURL="https://m.media-amazon.com/images/I/41j7lA0rK5L._AC_UY1000_.jpg"
                        owner={{
                            displayName: "Nitya",
                            email: "nitya@cornell.edu",
                            photoURL: "",
                        }}
                        description="Found this let me know if you want it!!!"
                        datetime={new Date()}
                        found={false}
                    />
                    <InfoCard
                        imageURL="https://m.media-amazon.com/images/I/41j7lA0rK5L._AC_UY1000_.jpg"
                        owner={{
                            displayName: "Nitya",
                            email: "nitya@cornell.edu",
                            photoURL: "",
                        }}
                        description="Found this let me know if you want it!!!"
                        datetime={new Date()}
                        found={true}
                    />
                    <InfoCard
                        imageURL="https://m.media-amazon.com/images/I/41j7lA0rK5L._AC_UY1000_.jpg"
                        owner={{
                            displayName: "Nitya",
                            email: "nitya@cornell.edu",
                            photoURL: "",
                        }}
                        description="Found this let me know if you want it!!!"
                        datetime={new Date()}
                        found={false}
                    />
                </div>
            </main>
        </div>
    );
}
