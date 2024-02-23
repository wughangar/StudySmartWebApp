import React from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {AppContext} from "./StoreProvider";

class TopicView extends React.Component
{
    static contextType = AppContext;

    componentDidMount()
    {
        if (!this.state)
        {
            this.setState({
                              question: "",
                          });
        }
        console.log("TOPIC VIEW STATE: ", this.state);
    }

    render()
    {
        if (this.state === null)
        {
            return null;
        }

        const {focusedTopic}      = this.context.state;
        const {question}          = this.state;
        const submitButtonEnabled = question.length > 0;

        if (!focusedTopic)
        {
            return (
                <Container>
                    <Row>
                        <Col>
                            <p className="text-danger">No topic selected</p>
                        </Col>
                    </Row>
                </Container>);
        }

        return (
            <Container className={'card card-body'}>
                <Row>
                    <Col>
                        <p className="h2 text-primary">{focusedTopic.title}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-secondary">{focusedTopic.generated_summary}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={this.onQuestionSubmitted}>
                            <Form.Group className="mb-3">
                                <Form.Label>Ask a question...</Form.Label>
                                <Form.Control type="text" onChange={this.onQuestionChanged} value={question}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={!submitButtonEnabled}>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }

    onQuestionSubmitted = () =>
    {
        this.setState({...this.state, question: ""});
    };

    onQuestionChanged = (event) =>
    {
        this.setState({...this.state, question: event.target.value});
    };
}

export default TopicView;
