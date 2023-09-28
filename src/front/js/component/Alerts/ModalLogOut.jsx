import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalLogOut = ({ show, onClose, onLogOut }) => {

    return (
        <>
            <Modal show={show} onHide={ onClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Cerrar Sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>Esta seguro de Cerrar Sesión?</Modal.Body>
                <Modal.Footer>
                    <Button className="btn-secondary btn-onclose" onClick={onClose}>
                        No, Volver
                    </Button>
                    <Button className="btn-info btn-onlogout" onClick={onLogOut}>
                        Si, Cerrar Sesión
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalLogOut.prototype;