import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalBlock = ({ show, onBlock, onClose }) => {

    return (
        <>
            <Modal show={show} onHide={ onClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Bloqueo de Pantalla</Modal.Title>
                </Modal.Header>
                <Modal.Body>Esta seguro de bloquear la pantalla?</Modal.Body>
                <Modal.Footer>
                    <Button className="btn-secondary btn-onclose" onClick={onClose}>
                        No, Cerrar
                    </Button>
                    <Button className="btn-info btn-onlogout" onClick={onBlock}>
                        Si, Bloquear
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalBlock.prototype;