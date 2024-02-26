import React from 'react';
import {Button, Col, Form, Row, Spinner} from 'react-bootstrap';
import {X} from "react-bootstrap-icons";
import {connect} from "react-redux";
import {askTopicQuestion} from "../common/backend_interface";

class AIChatBoxView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {value: ''};

        this.onElementChanged = this.onElementChanged.bind(this);
        this.onSubmitClicked  = this.onSubmitClicked.bind(this);
    }

    onElementChanged(event)
    {
        this.setState({value: event.target.value});
    }

    onSubmitClicked(event)
    {
        event.preventDefault();

        this.setState({value: ""});
        if(this.state.value.length === 0)
        {
            return;
            
        }
        if(this.props.currentTopicChapter)
        {
           askTopicQuestion(this.props.dispatch, 
                            this.props.currentTopic._id,
                            this.state.value,
                            this.props.currentTopicChapter.chapter_index)

        }
        else if(this.props.currentTopic)
        {
            askTopicQuestion(this.props.dispatch,
                             this.props.currentTopic._id,
                             this.state.value)
        }
        else
        {
            return null;
        }
    }


    onClearClicked = () =>
    {
        this.setState({
                          value: "",
                      });

    };

    render()
    {
        let greeting = "Ask a question!";

        if(this.props.currentTopicChapter)
        {
            greeting =
                "Ask a question about this CHAPTER... (" +
                this.props.currentTopic.title +
                " - " +
                this.props.currentTopicChapter.title +
                ")";

        }
        else if(this.props.currentTopic)
        {
            greeting = "Ask a question about this TOPIC... (" + this.props.currentTopic.title + ")";
        }
        else
        {
            return null;
        }

        return (
            <Form onSubmit={this.onSubmitClicked}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className={'fw-bolder text-primary text-center'}>{greeting}</Form.Label>
                    <Form.Control disabled={this.state.loading} as="textarea" rows={3} value={this.state.value}
                                  onChange={this.onElementChanged}/>
                </Form.Group>
                <Row className="justify-content-between">
                    <Col xs="auto">
                        <Button variant="primary"
                                type="submit"
                                className={' btn-sm'}
                                disabled={this.state.value.length === 0 || this.state.loading}>
                             Submit
                        </Button>
                        <Button variant="danger"
                                type="cancel"
                                className={' btn-sm'}
                                disabled={this.state.value.length === 0}
                                hidden={this.state.loading}
                                onClick={this.onClearClicked}>
                            Clear
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    currentTopic: state.topics.currentTopic,
    currentTopicChapter: state.topics.currentTopicChapter,
    topics: state.topics.topics,
});

export default connect(mapStateToProps)(AIChatBoxView);

