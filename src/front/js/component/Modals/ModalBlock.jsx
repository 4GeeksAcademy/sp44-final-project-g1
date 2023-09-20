import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalBlock = ({ show, onBlock, onClose }) => {

    return (
        <>
            <Modal show={show} onHide={ onClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Lock Screen</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to lock the screen?</Modal.Body>
                <Modal.Footer>
                    <Button className="btn-secondary btn-onclose" onClick={onClose}>
                        Close
                    </Button>
                    <Button className="btn-info btn-onlogout" onClick={onBlock}>
                        Yes, Lock Scren
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalBlock.prototype;