import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {connect} from "react-redux";
import {Button, Card, CardBody, CardFooter, CardHeader} from "react-bootstrap";
import {setTopicQA} from "../common/context_interface";
import ReactMarkdown from "react-markdown";

class PopupQADialog extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            showModal: false,
        };
    }

    handleClose = () => setTopicQA(this.props.dispatch, null);

    render()
    {
        const hasQuestion = this.props.currentTopicQA;

        if(!hasQuestion)
        {
            return null;
        }

        return (
            <>
                <Modal show={hasQuestion} onHide={this.handleClose}>
                    <Card>
                        <Modal.Header closeButton>
                            <CardHeader><Modal.Title>Q: {this.props.currentTopicQA.question}</Modal.Title></CardHeader>
                        </Modal.Header>
                        <CardBody><Modal.Body><ReactMarkdown>{this.props.currentTopicQA.answer}</ReactMarkdown></Modal.Body></CardBody>
                        <CardFooter><Modal.Footer>
                            <Button variant="primary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                        </CardFooter>
                    </Card>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    currentTopic: state.topics.currentTopic,
    currentTopicChapter: state.topics.currentTopicChapter,
    currentTopicQA: state.topics.currentTopicQA,
});

export default connect(mapStateToProps)(PopupQADialog);
