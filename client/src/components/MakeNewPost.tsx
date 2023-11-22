"use client";

import React, { useState, useRef, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { type User } from "../../../commons/types";
import { UserContext } from "../app/UserProvider";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import { type Moment as TMoment } from "moment";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

interface MakeNewPostProps {
    open: boolean;
    onClose: () => void;
    onPostCreated?: (post: {
      owner: {
          displayName: string | undefined,
          email: string | undefined,
          photoURL: string | undefined,
      },
      datetime: Date | TMoment,
      imageURL: string,
      found: boolean,
      description: string,
    }) => void;
  }

const MakeNewPost = (props: MakeNewPostProps) => {
    const { onPostCreated, open, onClose } = props;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [textAreaValue, setTextAreaValue] = useState("");
    const fileInput = useRef(null);
    const [loading, setLoading] = useState(false);

    let user: User | null = (useContext(UserContext) as unknown) as User | null;

    // New object for firestore
    const firestore = getFirestore();

    // New object for firebase storage
    const storage = getStorage();

    const uploadImageToFirebase = async (file: File) => {
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        setLoading(true);
    
        return new Promise<string>((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    console.log(error);
                    reject(error);
                }, 
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL as string);
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        })
    };

    // Add click handler here
    const handleAddPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select an image to upload.");
            return;
        }
        if (!textAreaValue) {
            alert("Please enter a description.");
            return;
        }

        try {
            const imageUrl = await uploadImageToFirebase(selectedFile);
            const post = {
                owner: {
                    displayName: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                },
                datetime: new Date() as Date | TMoment,
                imageURL: imageUrl,
                found: false,
                description: textAreaValue,
            };
        
            await addDoc(collection(firestore, "posts"), post); 
            console.log("Document written");
            if (post && post.owner) {
                // Convert to momentjs timestamp. Since calling toDate() on the frontend.
                post.datetime = moment(post.datetime);
                onPostCreated!(post); // add the new post to the frontend view
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        } finally {
            setLoading(false); // End loading
            onClose(); // Close modal
            setTextAreaValue(""); // Clear text area
            setSelectedFile(null); // Clear file input
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-title"
                    className="text-center text-lg text-black font-bold mb-2"
                >
                    Create new post
                </Typography>
                <textarea
                    rows={4}
                    placeholder="Describe the item and/or where you found it."
                    className="border-2 border-gray-300 rounded-md w-full p-2"
                    value={textAreaValue}
                    onChange={(e) => setTextAreaValue(e.target.value)}
                />
                <Button
                    className="bg-blue-600 text-white mt-2 flex mx-auto items-center justify-center self-center"
                    variant="contained"
                    size="small"
                    onClick={() => {
                        if (fileInput.current) {
                            (fileInput.current as any).click();
                        }
                    }}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload image
                    <input
                        type="file"
                        hidden
                        ref={fileInput}
                        onChange={(e) => setSelectedFile(e.target.files![0])} // Save the file into state when selected
                    />
                </Button>
                {loading ? (
                    <div className="flex justify-center mt-4">
                        <CircularProgress className="flex justify-center" size={30} />
                    </div>
                ) : (
                    <div className="flex justify-center gap-2 mt-2">
                        <Button
                            className="mt-2 items-center justify-center self-center bg-green-700"
                            variant="contained"
                            color="success"
                            onClick={handleAddPost}
                        >
                            Add
                        </Button>
                        <Button
                            className="mt-2 items-center justify-center self-center"
                            variant="outlined"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </Box>
        </Modal>
    );
};

export default MakeNewPost;
