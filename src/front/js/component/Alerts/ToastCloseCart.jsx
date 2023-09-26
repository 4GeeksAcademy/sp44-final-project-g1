import React from "react";
import { CloseButton, Stack, Toast } from "react-bootstrap";

export const ToastCloseCart = ({ onClose }) => {
    
    return (
        <Toast autohide className="toast text-black">
            <Stack direction="horizontal" gap={2}>
                <Toast.Body>Compra exitosa</Toast.Body>
                <CloseButton className="me-2 m-auto" onClick={onClose} />
            </Stack>
        </Toast>
    );
};


