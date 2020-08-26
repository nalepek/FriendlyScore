import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class Dialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: '',
            header: '',
            visible: false,
        };
    }

    onClose(){
        this.setState({ visible: false });
    }

    onSave() {
        this.setState({ visible: false });
        this.props.editItem.onContentUpdate(this.state.content);
    }

    componentDidMount() {
    };

    componentDidUpdate(prevProps) {
        if (this.props.editItem !== prevProps.editItem) {
            this.setState({ visible: true, content: this.props.editItem.content, header: this.props.editItem.header });
        }
    }

    render() {
        return (
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.state.visible}
                onHide={() => this.onClose()}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h6>Edit category for {this.state.header}</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <textarea className="form-control" rows="10" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} ></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={() => this.onClose()}>Discard</Button>
                    <Button variant="outline-success" onClick={(event) => this.onSave()}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Dialog;