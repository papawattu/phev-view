import React from 'react'

const ModalHeader = props => <div className="modal-header">{props.children}</div>

const ModalClose = props => <button type="button" onClick={props.close} className="close" data-dismiss="modal">&times;</button>

const ModalTitle = props => <h4 className="modal-title">{props.children}</h4>

const ModalBody = props => <div className="modal-body">{props.children}</div>
const ModalFooter = props => <div className="modal-footer">{props.children}</div>

class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.children = props.children
    }
    render() {
        return <div id="modal" className="modal show" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    {this.children}
                </div>
            </div>
        </div>
    }
}
export { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalClose }