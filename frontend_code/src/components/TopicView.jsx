import React from 'react';
import {Button, Col, Container, Form, Nav, Row} from 'react-bootstrap';
import {AppContext} from "./StoreProvider";

class TopicView extends React.Component
{
    static contextType = AppContext;

    componentDidMount()
    {
        if(!this.state)
        {
            this.setState({
                              question: "",
                              selectedTab: "summary",
                          });
        }
    }

    onQuestionSubmitted = () =>
    {
        this.setState({...this.state, question: ""});
    };

    onQuestionChanged = (event) =>
    {
        this.setState({...this.state, question: event.target.value});
    };

    onChangeView = (selectedTab) =>
    {
        this.setState({
                          selectedTab,
                      });
    };

    generateTabView = () =>
    {
        return (
            <Row>
                <Col>
                    <Nav variant="pills" defaultActiveKey="#">
                        <Nav.Item>
                            <Nav.Link onClick={() => this.onChangeView("summary")}
                                      eventKey="link-summary">Summary
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => this.onChangeView("study_guide")}
                                      eventKey="link-study-guide">Study Guide
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => this.onChangeView("quiz")}
                                      eventKey="link-quiz">Quiz
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => this.onChangeView("qa")}
                                      eventKey="link-qa">Q/A
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
        );
    };

    generateContentView = () =>
    {
        const {selectedTab} = this.state;

        switch(selectedTab)
        {
            case "summary":
                return this.generateTab_Summary();
            case "study_guide":
                return this.generateTab_StudyGuide();
            case "quiz":
                return this.generateTab_Quiz();
            case "qa":
                return this.generateTab_QA();
            default:
                return null;
        }
    };

    generateTab_StudyGuide = () =>
    {
        return (
            <Row>
                <Col>
                    Study Guide
                </Col>
            </Row>
        );
    };

    generateTab_Quiz = () =>
    {
        return (
            <Row>
                <Col>
                    Quiz
                </Col>
            </Row>
        );
    };

    generateTab_QA = () =>
    {
        return (
            <Row>
                <Col>
                    QA
                </Col>
            </Row>
        );
    };

    generateTab_Summary()
    {

        const {focusedTopic}      = this.context.state;
        const {question}          = this.state;
        const submitButtonEnabled = question.length > 0;

        if(!focusedTopic)
        {
            return (
                <Row>
                    <Col>
                        <p className="text-danger">No topic selected</p>
                    </Col>
                </Row>);
        }
        else
        {
            return (<>
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
                                    <Form.Control type="text" onChange={this.onQuestionChanged}
                                                  value={question}/>
                                </Form.Group>
                                <Button variant="primary" type="submit"
                                        disabled={!submitButtonEnabled}>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </>
            );

        }
    }

    render()
    {
        if(this.state === null)
        {
            return null;
        }

        return (
            <Container className={'card card-body'}>
                {this.generateTabView()}
                {this.generateContentView()}

            </Container>
        );
    }
}

export default TopicView;
