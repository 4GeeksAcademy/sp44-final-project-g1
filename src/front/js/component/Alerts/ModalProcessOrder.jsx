import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalProcessOrder = ({ show, onClose, onProcessOrder }) => {

    return (
        <>
            <Modal show={show} onHide={ onClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Finalizar Compra</Modal.Title>
                </Modal.Header>
                <Modal.Body>Esta seguro de Finalizar la compra?</Modal.Body>
                <Modal.Footer>
                    <Button className="btn-secondary btn-onclose" onClick={onClose}>
                        No, Volver
                    </Button>
                    <Button className="btn-info btn-onlogout" type="button" onClick={onProcessOrder}>
                        Si, Finalizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalProcessOrder.prototype;