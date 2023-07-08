import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react';

function PlainModal(props) {
    return (
        <Modal show={props.isOpen} onHide={()=>
            props.onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>props.onClose()}>
                    Close
                </Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PlainModal