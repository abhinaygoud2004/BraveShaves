import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react';

function PlainModal(props) {
    return (
        <Modal show={props.isOpen} onHide={()=>
            props.onClose()} >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>props.onClose()}>
                    Close
                </Button>
                <Button onClick={()=>props.onSave()} variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PlainModal