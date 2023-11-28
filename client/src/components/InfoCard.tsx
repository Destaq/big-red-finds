"use client";

import * as React from "react";
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
import { type Post } from "../../../commons/types";
import LocationOnIcon from '@mui/icons-material/LocationOn';


export default function InfoCard(props: Post) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false); // State for the delete modal

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        // Add your delete logic here
        console.log("Deleting the listing...");
    };
    
    

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }}>
                            {props.owner.displayName.slice(0, 2).toUpperCase()}
                        </Avatar>
                    }
                    title={
                        props.owner.displayName +
                        " – " +
                        props.owner.email
                    }
                    action={
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
                                <MenuItem key={"edit"} onClick={handleClose}>
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
                    image={props.imageURL}
                    src={props.imageURL}
                    alt="Lost and found item"
                    className="p-4 border-t border-b"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        <LocationOnIcon fontSize="small" sx={{ marginRight: '4px' }}></LocationOnIcon>
                        {props.location}
                    </Typography>
                </CardContent>
                <CardActions
                    disableSpacing
                    className="-mt-2 mb-2 flex justify-center"
                >
                    {!props.found && (
                        <Chip
                            label="Mark as Found"
                            className="cursor-pointer"
                        />
                    )}
                    {props.found && (
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
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
