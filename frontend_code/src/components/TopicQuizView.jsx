import React from 'react';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap';
import {ChatDotsFill} from "react-bootstrap-icons";
import {askTopicQuestion} from "../common/backend_interface";
import {setLoadingDialogStatus} from "../common/context_interface";

class TopicQuizView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentQuestionIndex: 0,
            userAnswers: [],
            checkedValue: null,
        };
    }

    handleAnswerSubmit = event =>
    {
        event.preventDefault();
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            checkedValue: null,
        }));
    };

    handleAnswerChange = event =>
    {
        const {currentQuestionIndex, userAnswers} = this.state;
        const selectedChoiceIndex                 = parseInt(event.currentTarget.value);
        userAnswers[currentQuestionIndex]         = selectedChoiceIndex;

        this.setState({
                          userAnswers: userAnswers,
                          checkedValue: selectedChoiceIndex,  // storing the checked radio button here
                      });
    };

    onExplainQuestion = (e, question_index) =>
    {
        console.log(`Explaining question: ${question_index}`)
        setLoadingDialogStatus(this.props.dispatch, "Asking question...")
        askTopicQuestion(this.props.dispatch, this.props.topic._id, this.props.questions[question_index].question)
    };

    render()
    {
        const {currentQuestionIndex, userAnswers, checkedValue} = this.state;
        const currentQuestion                                   = this.props.questions[currentQuestionIndex];

        if(currentQuestionIndex >= this.props.questions.length || (this.props.max && currentQuestionIndex >= this.props.max))
        {
            // Quiz ended
            let correctAnswers   = [];
            let incorrectAnswers = [];

            for(let i = 0; i < userAnswers.length; ++i)
            {
                if(userAnswers[i] === this.props.questions[i].answer_index)
                {
                    correctAnswers.push(i);
                }
                else
                {
                    incorrectAnswers.push(i);
                }
            }

            const score = correctAnswers.length;

            const incorrectRows = incorrectAnswers.map(
                (question_index) =>
                {
                    const question = this.props.questions[question_index];
                    return (
                        <Row>
                            <Col className={'d-flex p-1 text-danger'}>
                                <a href="#"><ChatDotsFill className={'mx-2'} color={'yellow'}
                                                          onClick={(e) => this.onExplainQuestion(e,
                                                                                                 question_index)}/></a>
                                {question_index+1}. {question.question}
                            </Col>
                        </Row>
                    );
                });

            const incorrectSection = (
                <Container>
                    <Row>
                        <Col>
                            Here are the questions that were answered incorrectly:
                        </Col>
                    </Row>
                    {incorrectRows}
                </Container>
            );

            return (
                <Container fluid>
                    <Row>
                        <Col>
                            <Alert variant="primary">
                                Your score: {score}/{this.props.max ? this.props.max : this.props.questions.length}
                            </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {incorrectSection}
                        </Col>
                    </Row>
                </Container>
            );
        }

        return (
            <Container>
                <h5>{currentQuestion.question}</h5>
                <Form onSubmit={this.handleAnswerSubmit}>
                    {currentQuestion.answer_choices.map((choice, index) => (
                        <div key={index} className="mb-3">
                            <Form.Check
                                type="radio"
                                id={`choice-${index}`}
                                name="answerChoices"
                                label={choice}
                                value={index}
                                onChange={this.handleAnswerChange}
                                checked={checkedValue === index}
                            />
                        </div>
                    ))}
                    <Button disabled={checkedValue === null} variant="primary" type="submit">Next Question</Button>
                    <p>{currentQuestion.answer}</p>
                </Form>
            </Container>
        );
    }

}

export default TopicQuizView;
