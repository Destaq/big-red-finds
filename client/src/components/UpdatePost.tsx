"use client";

import React, { useState, useRef, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { doc, collection, addDoc, updateDoc } from "firebase/firestore";
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
import { type Post } from "../../../commons/types";

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

interface UpdatePostProps {
    open: boolean;
    onClose: () => void;
    onUpdate: (post: Post)=>void,
    myPost:Post;
  }

const UpdatePost = (props: UpdatePostProps) => {
    const {onUpdate, open, onClose,myPost } = props;
    const [loading, setLoading] = useState(false);
    const fileInput = useRef(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [description, setDescription] = useState(myPost.description);
    const [location, setLocation] = useState(myPost.location);
    const [imageURL, setImageURL] = useState(myPost.imageURL);

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

                if (!description) {
            alert("Please enter a description.");
            return;
        }
        if (!location) {
                        alert("Please enter a location.");
            return;
        }

        let tempImageUrl:string ;
        tempImageUrl= imageURL;

        try {
            if (selectedFile) {
              tempImageUrl = await uploadImageToFirebase(selectedFile);
            }
             
            if (description)
                setDescription(description);
            if (location)
                setLocation(location);
            if (tempImageUrl)
                setImageURL(tempImageUrl);
            
            const postDocRef = doc(getFirestore(), "posts", myPost.id) as any; 
            await updateDoc(postDocRef,{description:description, location:location,imageURL:tempImageUrl});
            props.onUpdate(myPost);
            console.log("Document written");
        } catch (e) {
            console.error("Error adding document: ", e);
        } finally {
            setLoading(false); // End loading
            onClose(); // Close modal
            setDescription(myPost.description); // Clear text area
            setImageURL(myPost.imageURL); // Clear file input
            setLocation(myPost.location)
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
                    Update post
                </Typography>
                <textarea
                    rows={4}
                    placeholder="Describe the item."
                    className="border-2 border-gray-300 rounded-md w-full p-2"
                    value={myPost.description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Where did you find the item?"
                    className="border-2 border-gray-300 rounded-md w-full p-2 mt-2"
                    value={myPost.location}
                    onChange={(e) => setLocation(e.target.value)}
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
                            Update
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

export default UpdatePost;
