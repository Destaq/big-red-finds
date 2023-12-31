"use client";

import * as React from "react";
import  { useState, useRef, useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import Chip from "@mui/material/Chip";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import UpdatePost from "./UpdatePost";
import { type Post } from "../../../commons/types";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { deleteDoc, doc,updateDoc } from "firebase/firestore";
import { collection, getFirestore } from "firebase/firestore";

//hello testing testing testing

export default function InfoCard(props: Post) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for the delete modal
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // State for the update modal
    const [isFound, setIsFound] = useState(props.found);
    const [isItemUpdated, setIsItemUpdated] = useState(props.itemUpdated);
    const [description, setDescription] = useState(props.description);
    const [location, setLocation] = useState(props.location);
    const [imageURL, setImageURL] = useState(props.imageURL);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        try {
            console.log("Deleting listing for " + props.description);
            const postDocRef = doc(getFirestore(), "posts", props.id);
            await deleteDoc(postDocRef);
            console.log("Listing deleted successfully!");
            setIsDeleteModalOpen(false);
            props.handleStateChange(postDocRef,true);
            setIsItemUpdated(true);
        } catch (error) {
            console.error("Error deleting listing:", error);
        }
    };

    const handleMarkAsFound = async () => {
        try {
            const postDocRef = doc(getFirestore(), "posts", props.id) as any; 
            await updateDoc(postDocRef,{found:true});

            
          setIsFound(true);
          // props.handleStateChange(postDocRef,false);
          console.log("Post marked as found!");
        } catch (error) {
          console.error("Error marking post as found:", error);
        }
      };
    
      const handleUpdate = async (updatedPost:Post) => {
        try {
            const postDocRef = doc(getFirestore(), "posts", props.id) as any; 
            // let imageURL : string = postDocRef.imageURL;
            // const newPosts = postSnapshot.docs.map((doc) => ({
                // ...doc.data(),
            // }));
            setDescription(updatedPost.description);
            setLocation(updatedPost.location);
            setImageURL(updatedPost.imageURL);

            // this.setState(prevState => {
            //     return {...prevState, description:description, location:location,imageURL:imageURL};
            // });
            
            setIsItemUpdated(true);
            // props.handleStateChange(postDocRef,false);
            console.log("Post updated!");

            setIsItemUpdated(false);

        } catch (error) {
          console.error("Error updating post :", error);
        }
      };

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} src={props.owner.photoURL}>
                            {props.owner.displayName.slice(0, 2).toUpperCase()}
                        </Avatar>
                    }
                    title={
                        props.owner.displayName +
                        " – " +
                        props.owner.email
                    }
                    action={props.allowManagement &&
                        <div>
                            <IconButton
                                aria-label="settings"
                                onClick={handleOpenMenu}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "long-button",
                                }}
                            >
                                <MenuItem key={"edit"} onClick={ () => {
                                    setIsUpdateModalOpen(true);
                                    handleClose();
                                    }}
                                >
                                    Edit
                                </MenuItem>
                                <MenuItem
                                    key={"delete"}
                                    onClick={() => {
                                        setIsDeleteModalOpen(true);
                                        handleClose(); // Close the menu after opening the modal
                                    }}
                                >
                                    Delete
                                </MenuItem>
                            </Menu>
                        </div>
                    }
                    subheader={props.datetime.toLocaleString()}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={imageURL}
                    src={imageURL}
                    alt="Lost and found item"
                    className="p-4 border-t border-b"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        <LocationOnIcon fontSize="small" sx={{ marginRight: '4px' }}></LocationOnIcon>
                        {location}
                    </Typography>
                </CardContent>
                <CardActions
                    disableSpacing
                    className="-mt-2 mb-2 flex justify-center"
                >
                    {!isFound && (
                        <Chip
                            label="Mark as Found"
                            className="cursor-pointer"
                            onClick={handleMarkAsFound}

                        />
                    )}
                    {isFound && (
                        <Chip
                            label="Claimed Found"
                            color="success"
                            className="cursor-not-allowed"
                        />
                    )}
                </CardActions>
            </Card>
            {isDeleteModalOpen && (
                    <ConfirmDeleteModal
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onDelete={() => handleDelete()} 
                        />
                )
            }
            {isUpdateModalOpen && (
                    <UpdatePost
                        open={isUpdateModalOpen}
                        onClose={() => setIsUpdateModalOpen(false)}
                        myPost={props}
                        onUpdate={handleUpdate} 

                        />
                )
            }

        </div>
    );
}
