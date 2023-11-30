"use client";

import * as React from "react";
import { useState, useContext, useCallback, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { UserContext } from "../app/UserProvider";
import InfoCard from "../components/InfoCard";
import {
    Avatar,
    Button,
    ButtonBase,
    Stack,
    Menu,
    MenuItem,
} from "@mui/material";
import MakeNewPost from "../components/MakeNewPost";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../fb_setup";
import { User } from "../../../commons/types";
import { Post } from "../../../commons/types";
import {
    collection,
    getFirestore,
    query,
    getDocs,
    orderBy,
    limit,
    startAfter,
} from "firebase/firestore";

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore();
let flag = true;


export default function Home() {
    const [isCreateNewPostOpen, setIsCreateNewPostOpen] = useState(false);
    const postsPerPage = 3;
    const [posts, setPosts] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [postsDeletedOrUpdated,setPostDeletedOrUpdated] = useState(false);

    function handleState(updatedPost :Post, isDeleted:boolean) {
        // setPostDeletedOrUpdated(true);
        if (isDeleted) {
            setPosts(current =>
            current.filter(post => {
              return post.id !== updatedPost.id;
            }),
          );
        } else {
            setPosts(current);
        }
        console.log("state Changed from child component!");
     }
  
    const fetchPosts = async (lastDoc: any = null) => {
        try {
            const postCol = collection(db, "posts");
            let postQuery: any;
            if (lastDoc) {
                postQuery = query(
                    postCol,
                    orderBy("datetime", "desc"),
                    startAfter(lastDoc),
                    limit(postsPerPage)
                );
            } else {
                postQuery = query(
                    postCol,
                    orderBy("datetime", "desc"),
                    limit(postsPerPage)
                );
            }

            const postSnapshot = await getDocs(postQuery);

            if (!postSnapshot.empty) {
                // prevent end edge case
                const lastVisible =
                    postSnapshot.docs[postSnapshot.docs.length - 1];
                setLastDoc(lastVisible);
            }

            const newPosts = postSnapshot.docs.map((doc) => ({
                id: doc.FieldPath,
                ...doc.data(),
            }));
            setPosts((prevState: any[]) => [...prevState, ...newPosts]);
        } catch (err) {
            console.log(err);
        }

        setLoading(false); // Posts read in.
    };

    useEffect(() => {
        if (flag) {
                fetchPosts();
            flag = false; // don't fetch twice
        }
    }, []);

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
    }, []);

    // When we create a new post, we should prepend it.
    const addPost = (post: Post) => {
        setPosts([post, ...posts]);
    };

    if (loading) {
        // Show loading spinner while determining the authentication status.
        // Use a div to center the spinner
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                }}
            >
                <CircularProgress />
            </div>
        );
    } else {
        return (
            <div>
                <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-24 bg-gray-50">
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
                            <MakeNewPost
                                open={isCreateNewPostOpen}
                                onClose={handleClose}
                                // @ts-ignore
                                onPostCreated={addPost}
                            />
                        </div>
                    </div>

                    <div className="relative grid grid-cols-3 gap-x-4 gap-y-8">
                        <h2 className="text-xl font-bold text-black text-center absolute -top-12">
                            Big&nbsp;<span className="text-red-800">Red</span>
                            &nbsp;Finds
                        </h2>
                        <div className="absolute -top-12 right-0">
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
                                            sx={{ width: 36, height: 36 }}
                                            imgProps={{
                                                referrerPolicy: "no-referrer",
                                            }}
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
                        {posts.map((post: any) => (
                            <InfoCard
                                //key={post.id} //should not use this..this is for internal react use only !!
                                imageURL={post.imageURL}
                                owner={post.owner}
                                description={post.description}
                                datetime={post.datetime.toDate()}
                                found={post.found}
                                id = {post.id}
                                itemUpdated={false}
                                handleStateChange={handleState}
                            />
                        ))}
                    </div>
                    <Button
                        variant="contained"
                        className="bg-blue-700 mt-4"
                        // Changing state to call useEffect
                        onClick={() => fetchPosts(lastDoc)}
                    >
                        Fetch More
                    </Button>
                </main>
            </div>
        );
    }
}
