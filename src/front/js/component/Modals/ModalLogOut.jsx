import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalLogOut = ({ show, onClose, onLogOut }) => {

    return (
        <>
            <Modal show={show} onHide={ onClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Log Out</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button className="btn-secondary btn-onclose" onClick={onClose}>
                        Close
                    </Button>
                    <Button className="btn-danger btn-onlogout" onClick={onLogOut}>
                        Yes, Log Out
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalLogOut.prototype;