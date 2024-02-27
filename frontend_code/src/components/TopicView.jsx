import React from 'react';
import {Button, Col, Container, Nav, Row} from 'react-bootstrap';
import {connect} from "react-redux";
import {generateQuizForTopic, generateStudyGuideForTopic} from "../common/backend_interface";
import {setLoadingDialogStatus, setTopicChapter} from "../common/context_interface";
import TopicChapterView from "./TopicChapterView";
import ChaptersList from './TopicChapterList';
import ReactMarkdown from "react-markdown";
import TopicQuizView from "./TopicQuizView";
import TopicQAView from "./TopicQAView";
import TopicStudyGuideView from "./TopicStudyGuideView";

const QuizQuestion = ({question_index, quiz}) =>
{
    const {answer_choices, hints, question} = quiz;

    return (<div className="card">
        <div className="card-body">
            <h5 className="card-title">{question}</h5>
            {answer_choices.map((choice, index) => (<div key={`${choice}-${index}`} className="form-check">
                <input className="form-check-input" type="radio" name="quizChoice"
                       id={`choice-${question_index}-${index}`}
                       value={choice}/>
                <label className="form-check-label" htmlFor={`choice-${question_index}-${index}`}>
                    {choice}
                </label>
            </div>))}

            {/*<button className="btn btn-primary mt-3" type="button" data-bs-toggle="collapse"*/}
            {/*        data-bs-target="#collapseHint"*/}
            {/*        aria-expanded="false" aria-controls="collapseHint">*/}
            {/*    Show Hint*/}
            {/*</button>*/}
            {/*<div className="collapse mt-3" id="collapseHint">*/}
            {/*    <div className="card card-body">*/}
            {/*        {hints.join('<br/>')}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    </div>);
};

// Chapter Component

class TopicView extends React.Component
{
    componentDidMount()
    {
        if(!this.state)
        {
            this.setState({
                              question: "", selectedTab: "summary",
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
        if(selectedTab === 'study_guide')
        {
            setTopicChapter(this.props.dispatch, null);
        }

        this.setState({
                          selectedTab,
                      });
    };

    generateTabView = () =>
    {
        const numQA = this.props.currentTopic.qa_questions ? this.props.currentTopic.qa_questions.length : 0;
        return (<Row>
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
                                  eventKey="link-qa">Q/A ({numQA})
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Col>
        </Row>);
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
        return <TopicStudyGuideView/>
    };

    generateTab_Quiz = () =>
    {
        const {currentTopic} = this.props;
        let quizQuestions    = null;

        console.log("CURRENT TOPIC: ", currentTopic);
        if(currentTopic && currentTopic.study_guide && currentTopic.study_guide.chapters)
        {
            const chapters = currentTopic.study_guide.chapters;

            const filteredChapters = chapters.filter(
                (chapter) => chapter.quiz_questions && chapter.quiz_questions.length > 0);
            
            console.log("FILTERED: ", filteredChapters)
            quizQuestions = filteredChapters.map((chapter) =>
                                                 {
                                                     return chapter.quiz_questions;
                                                 }).flat();

        }
        
        console.log("quizQuestions: ", quizQuestions)

        if(!quizQuestions || quizQuestions.length === 0)
        {
            return null;
        }

        return (<>
            <Row>
                <Col>
                    <TopicQuizView dispatch={this.props.dispatch}  topic={this.props.currentTopic} questions={quizQuestions} max={10}/>
                </Col>
            </Row>
        </>);
    };

    generateTab_QA = () =>
    {
        if(!this.props.currentTopic)
        {
            return null;
        }
        
        return <TopicQAView questions={this.props.currentTopic.qa_questions}/>
    };

    generateTab_Summary()
    {

        const {currentTopic}      = this.props;
        const {question}          = this.state;
        const submitButtonEnabled = question.length > 0;

        if(!currentTopic)
        {
            return (<Row>
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
                        <p className="h3 text-white">{currentTopic.title}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-secondary">{currentTopic.summary}</p>
                    </Col>
                </Row>
            </>);

        }
    }

    render()
    {
        if(this.state === null)
        {
            return null;
        }

        return (<Container fluid className={'card card-body'}>
            {this.generateTabView()}
            {this.generateContentView()}

        </Container>);
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    currentTopic: state.topics.currentTopic,
    quiz: state.topics.quiz,
    studyGuide: state.topics.studyGuide,
    currentTopicChapter: state.topics.currentTopicChapter,
});

export default connect(mapStateToProps)(TopicView);
