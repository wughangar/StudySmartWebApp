import React from 'react';
import {Button, Col, Container, Form, Nav, Row} from 'react-bootstrap';
import {connect} from "react-redux";
import {generateQuizForTopic, generateStudyGuideChapter, generateStudyGuideForTopic} from "../common/backend_interface";
import {setLoadingDialogStatus} from "../common/context_interface";
import ReactMarkdown from 'react-markdown';

const QuizQuestion = ({quiz}) =>
{
    const {answer_choices, hints, question} = quiz;

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{question}</h5>
                {answer_choices.map((choice, index) => (
                    <div key={index} className="form-check">
                        <input className="form-check-input" type="radio" name="quizChoice" id={`choice${index}`}
                               value={choice}/>
                        <label className="form-check-label" htmlFor={`choice${index}`}>
                            {choice}
                        </label>
                    </div>
                ))}

                <button className="btn btn-primary mt-3" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseHint"
                        aria-expanded="false" aria-controls="collapseHint">
                    Show Hint
                </button>
                <div className="collapse mt-3" id="collapseHint">
                    <div className="card card-body">
                        {hints.join(' ')}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Chapter Component
const Chapter = (dispatch, topic_id, chapter) =>
{
    const onGenerateClicked = () => {
        setLoadingDialogStatus(dispatch, `Generating chapter ${chapter.chapter_index}...`);
        generateStudyGuideChapter(dispatch, topic_id, chapter.chapter_index)
    }
    
    if(chapter.body)
    {
        return (
            <li className='list-group-item bg-secondary'>
                <a href="#" className="h6 text-decoration-none link-primary">{chapter.chapter_index}. {chapter.title}</a>
                <p className="mb-0 text-secondary">{chapter.extra_description}</p>
                <p className="mb-0 text-primary"><ReactMarkdown>{chapter.body}</ReactMarkdown></p>
            </li>
        );
    }
    else
    {
        return (
            <li className='list-group-item bg-danger'>
                <a href="#" className="h6 text-decoration-none link-primary">{chapter.chapter_index}. {chapter.title}</a>
                <p className="mb-0 text-secondary">{chapter.extra_description}</p>
                <Button className={'btn-sm'} onClick={onGenerateClicked}>Generate Chapter</Button>
            </li>
        );
        
    }
};

// Chapters List Component
const ChaptersList = (dispatch, topic) =>
{
    const chapters = topic.study_guide.chapters
    
    return (
        <ul className="list-group">
            {chapters.map(chapter => Chapter(dispatch, topic._id, chapter))}
        </ul>
    );
};

class TopicView extends React.Component
{
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

    onGenerateQuizClicked = () =>
    {
        setLoadingDialogStatus(this.props.dispatch, "Generating quiz...");
        generateQuizForTopic(this.props.dispatch, this.props.currentTopic._id);
    };

    onGenerateStudyGuideClicked = () =>
    {
        setLoadingDialogStatus(this.props.dispatch, "Generating study guide...");
        generateStudyGuideForTopic(this.props.dispatch, this.props.currentTopic._id);
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
        const {currentTopic} = this.props;

        console.log("The current topic: ", currentTopic);
        const studyGuide = currentTopic.study_guide;

        if(!studyGuide || !studyGuide.chapters)
        {
            return (
                <Row>
                    <Col>
                        <Button variant="primary" onClick={this.onGenerateStudyGuideClicked}>Generate a Study
                            Guide!</Button>
                    </Col>
                </Row>
            );
        }


        return (
            <Row>
                <Col>
                    {ChaptersList(this.props.dispatch, currentTopic)}
                </Col>
            </Row>
        );
    };

    generateTab_Quiz = () =>
    {
        const {currentTopic} = this.props;
        const quizQuestions  = currentTopic.quiz_questions;

        console.log("QUIZ QUESTIONS: ", quizQuestions);

        const questionElements = quizQuestions.map(
            (qa, index) =>
            {
                return (
                    <QuizQuestion quiz={qa}/>);
            });

        const btnText = quizQuestions.length > 0 ? "Generate More!" : "Generate a Quiz!";
        
        return (<>
                <Row>
                    <Col>
                        {questionElements}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" onClick={this.onGenerateQuizClicked}>{btnText}</Button>
                    </Col>
                </Row>
            </>
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

        const {currentTopic}      = this.props;
        const {question}          = this.state;
        const submitButtonEnabled = question.length > 0;

        if(!currentTopic)
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
                            <p className="text-secondary">{currentTopic.summary}</p>
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

const mapStateToProps = state => ({
    user: state.users.user,
    currentTopic: state.topics.currentTopic,
    quiz: state.topics.quiz,
    studyGuide: state.topics.studyGuide,
});

export default connect(mapStateToProps)(TopicView);
