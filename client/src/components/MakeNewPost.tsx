"use client"

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const MakeNewPost = (props: { open: boolean; onClose: () => void }) => {
    const { open, onClose } = props; // Destructuring props

    const blue = {
        100: "#DAECFF",
        200: "#b6daff",
        400: "#3399FF",
        500: "#007FFF",
        600: "#0072E5",
        900: "#003A75",
    };

    const grey = {
        50: "#F3F6F9",
        100: "#E5EAF2",
        200: "#DAE2ED",
        300: "#C7D0DD",
        400: "#B0B8C4",
        500: "#9DA8B7",
        600: "#6B7A90",
        700: "#434D5B",
        800: "#303740",
        900: "#1C2025",
    };

    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
            width: 320px;
            font-family: IBM Plex Sans, sans-serif;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.5;
            padding: 8px 12px;
            border-radius: 8px;
            color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
            background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
            border: 1px solid ${
                theme.palette.mode === "dark" ? grey[700] : grey[200]
            };
            box-shadow: 0px 2px 2px ${
                theme.palette.mode === "dark" ? grey[900] : grey[50]
            };
        
            &:hover {
            border-color: ${blue[400]};
            }
        
            &:focus {
            border-color: ${blue[400]};
            box-shadow: 0 0 0 3px ${
                theme.palette.mode === "dark" ? blue[600] : blue[200]
            };
            }
        
            // firefox
            &:focus-visible {
            outline: 0;
            }
        `
    );

    return (
        <Modal
            open={open} // Using the 'open' prop directly
            onClose={onClose} // Using the 'onClose' prop directly
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
                <Textarea
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Describe the item and/or where you found it."
                />
                <Button
                    className="bg-blue-600 text-white mt-2 flex mx-auto items-center justify-center self-center"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                >
                    Upload image
                    <VisuallyHiddenInput type="file" />
                </Button>
            </Box>
        </Modal>
    );
};

export default MakeNewPost;
