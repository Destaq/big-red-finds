import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

export default function ConfirmDeleteModal(props: {
    onClose: () => void;
    open: boolean;
    onDelete: () => void; //function when deleted
}) {
    return (
        <div>
            <Modal
                open={props.open} // The modal is always open when rendered
                onClose={props.onClose} // Close the modal when requested
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Delete Listing
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete this listing?
                    </Typography>
                    <div className="mt-4 grid grid-cols-2 place-items-center">
                        <Button onClick={props.onClose}>Cancel</Button>
                        {/* TODO: handle delete logic */}
                        <Button
                            color="error"
                            variant="contained"
                            className="bg-red-600"
                            onClick={props.onDelete} 
                        >
                            Delete
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
