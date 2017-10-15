import React from 'react'

const ErrorModal = props => props.error !== undefined ? <Modal>
    <ModalHeader>
        <ModalClose close={props.hideModal} />
        <ModalTitle>Error</ModalTitle>
    </ModalHeader>
    <ModalBody>
        <p>{props.error}</p>
    </ModalBody>
    <ModalFooter>
        <button className='btn btn-default' onClick={props.hideModal}>Close</button>
    </ModalFooter>
</Modal> : null

export default ErrorModal