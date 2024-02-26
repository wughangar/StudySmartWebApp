import React from 'react';
import {Accordion, Button, Col, Container, Row} from 'react-bootstrap';
import {connect} from "react-redux";
import {setLoadingDialogStatus, setTopicChapter} from "../common/context_interface";
import ReactMarkdown from "react-markdown";
import {generateQuizForTopic} from "../common/backend_interface";
import TopicQuizView from "./TopicQuizView";

class TopicStudyGuideChapterView extends React.Component
{
    onBackClicked = () =>
    {
        setTopicChapter(this.props.dispatch, null);
    };

    onGenerateQuiz = (e) =>
    {
        e.preventDefault()
        setLoadingDialogStatus(this.props.dispatch,"Generating chapter quiz...")
        generateQuizForTopic(this.props.dispatch,
                             this.props.currentTopic._id,
                             this.props.currentTopicChapter.chapter_index);
    };

    generateQuizDisplay = () =>
    {
        if(!this.hasQuizQuestions)
        {
            return "No questions.";
        }

        return <TopicQuizView questions={this.props.currentTopicChapter.quiz_questions}/>
    };


    generateQADisplay = () =>
    {
        if(!this.hasQAQuestions)
        {
            return "No answered questions.";
        }

        const rows = this.props.currentTopicChapter.qa_questions.map(
            (qa, idx) =>
            {
                return (
                    <Container fluid className={' mt-2'}>
                        <Row className={'text-warning bg-black'}>
                            <Col >Q: {qa.question}</Col>
                        </Row>
                        <Row className={'card-body text-primary bg-secondary'}>
                            <Col ><ReactMarkdown>{qa.answer}</ReactMarkdown></Col>
                        </Row>
                    </Container>);

            });

        
        return rows;
    };


    hasQuizQuestions = () =>
    {
        return this.props.currentTopicChapter.quiz_questions &&
               this.props.currentTopicChapter.quiz_questions.length > 0;
    };

    hasQAQuestions = () =>
    {
        return this.props.currentTopicChapter.qa_questions &&
               this.props.currentTopicChapter.qa_questions.length > 0;
    };

    render()
    {
        const backgroundColor = "#fff";

        const quizHeaderRow = this.hasQuizQuestions() ?
                              (
                                  <Row>
                                      <Col className="text-right">
                                          Take the quiz!
                                      </Col>
                                  </Row>
                              ) : (
                                  <Row>
                                      <Col className="text-right">
                                          <Button onClick={this.onGenerateQuiz} className={'btn-sm'}>
                                              Generate a quiz!
                                          </Button>
                                      </Col>
                                  </Row>
                              );

        const quizBodyRow = this.hasQuizQuestions() ?
                            (
                                <Row>
                                    <Col className="text-right">
                                        {this.generateQuizDisplay()}
                                    </Col>
                                </Row>
                            ) : (
                                <Row>
                                    <Col className="text-right">
                                    </Col>
                                </Row>
                            );
        
        const numQA = this.props.currentTopicChapter.qa_questions? this.props.currentTopicChapter.qa_questions.length: 0;
        
        const qaHeaderRow = (
            <Row>
                <Col className="text-right">
                    Answered Questions ({numQA})
                </Col>
            </Row>
        )
        
        const qaBodyRow = this.hasQAQuestions() ?
                            (
                                <Row>
                                    <Col className="text-right">
                                        {this.generateQADisplay()}
                                    </Col>
                                </Row>
                            ) : (
                                <Row>
                                    <Col className="text-right">
                                    </Col>
                                </Row>
                            );

        return (
            <Container fluid>
                <Row className={'my-3'}>
                    <Col>
                        <a href={"#"} className={'link-primary'} onClick={this.onBackClicked}>&lt;&lt; Table of
                            Contents</a>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Accordion defaultActiveKey={"0"} className={'card'}>
                            <Accordion.Item eventKey="0" style={{backgroundColor: backgroundColor}}>
                                <Accordion.Header>
                                    <p className="mb-0 fw-bold text-secondary">{this.props.currentTopicChapter.chapter_index}. {this.props.currentTopicChapter.title}</p>
                                </Accordion.Header>
                                <Accordion.Body className={'bg-secondary'}>
                                    <ReactMarkdown>{this.props.currentTopicChapter.body}</ReactMarkdown>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" style={{backgroundColor: backgroundColor}}>
                                <Accordion.Header>
                                    {quizHeaderRow}
                                </Accordion.Header>
                                <Accordion.Body className={'bg-secondary'}>
                                    {quizBodyRow}
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2" style={{backgroundColor: backgroundColor}}>
                                <Accordion.Header>
                                    {qaHeaderRow}
                                </Accordion.Header>
                                <Accordion.Body className={'bg-secondary'}>
                                    {qaBodyRow}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>

            </Container>
        );
    }


}

const mapStateToProps = state => ({
    user: state.users.user,
    currentTopic: state.topics.currentTopic,
    currentTopicChapter: state.topics.currentTopicChapter,
    topics: state.topics.topics,
});

export default connect(mapStateToProps)(TopicStudyGuideChapterView);
