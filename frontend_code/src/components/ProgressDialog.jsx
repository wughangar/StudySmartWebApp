import React from 'react';
import {Button, Modal, ProgressBar} from 'react-bootstrap';
import {connect} from "react-redux";

class ProgressDialog extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            progress: 0,
        };
    }


    onClose = () =>
    {
        if(this.props.handleClose)
        {
            this.props.handleClose();
        }

    };

    onCancel = () =>
    {
        if(this.props.onCancel)
        {
            this.props.onCancel();
        }
    };

    render()
    {
        const {progress} = this.props;
        
        if(!progress)
        {
            return null;
        }
        
        return (
            <Modal className={'bg-primary'} show={this.props.show} onHide={this.onClose}>
                <Modal.Header>
                    <Modal.Title>Progress Dialog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{progress.stepName}</p>
                    <ProgressBar variant='primary'
                                 visuallyHidden={false}
                                 min={0.0} 
                                 max={1.0} 
                                 now={progress.progress} 
                                 label={`${Math.ceil(progress.progress * 100)}%`}
                                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onCancel}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    progress: state.app.progress
});

export default connect(mapStateToProps)(ProgressDialog);
