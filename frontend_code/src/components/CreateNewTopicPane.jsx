import React from 'react';
import {Button, Col, Container, FormControl, Row} from 'react-bootstrap';
import {askAI} from "../common/backend_interface";

class CreateNewTopicPane extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            topicTitle: '',
            textBoxes: ['test'],
            bestSummary: null,
            errorMsg: null,
        };
    }

    handleInputChange = (event) =>
    {
        this.setState({topicTitle: event.target.value});

    };

    handleTextBoxChange = (index, event) =>
    {
        const newTextBoxes  = this.state.textBoxes.slice();
        newTextBoxes[index] = event.target.value;
        this.setState({textBoxes: newTextBoxes});
    };

    handleUpdate = (event) =>
    {
        // Do something for updating the topic
        event.preventDefault();
        const {topicTitle} = this.state;

        const answer = askAI(`Please generate a one paragraph summary of the following topic for a beginner: ${topicTitle}`);

        this.addSummaryCandidate(answer.answer);

    };

    handleSave = (event) =>
    {
        const {topicTitle, bestSummary} = this.state;


    };

    addSummaryCandidate = (answer) =>
    {
        this.setState(prevState => ({
            textBoxes: [...prevState.textBoxes, answer],
        }));
    };

    handleClickSelectCandidateBtn = (textBox) =>
    {
        this.setState(prevState => ({
            textBoxes: prevState.bestSummary ?
                [...prevState.textBoxes.filter(tb => tb !== textBox), prevState.bestSummary] :
                       prevState.textBoxes.filter(tb => tb !== textBox),
            bestSummary: textBox,
        }));
    };

    render()
    {
        const {errorMsg, topicTitle, bestSummary, textBoxes} = this.state;

        const errorRow = errorMsg === null ? null : (
            <Row>
                <Col>
                    <p className={'text-danger'}>ERROR: {errorMsg}</p>
                </Col>
            </Row>
        );


        const generateNewSummaryBtnDisabled = topicTitle.length === 0;
        const saveBtnDisabled               = generateNewSummaryBtnDisabled || bestSummary === null;

        const bestSummaryRow = bestSummary === null ? null : (
            <>
                <Row>
                    <Col className={'text-primary'}>
                        Summary
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormControl
                            as="textarea"
                            readOnly
                            className={'bg-secondary'}
                            placeholder={`bestSummary`}
                            value={bestSummary}
                        />
                    </Col>
                </Row>
            </>
        );

        return (
            <Container className={'card card-body'}>
                <Row>
                    <Col className={'text-primary'}>
                        Topic
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <FormControl
                            type="text"
                            placeholder="Enter topic title"
                            value={this.state.topicTitle}
                            onChange={this.handleInputChange}
                        />
                    </Col>

                </Row>

                {bestSummaryRow}
                <Row>
                    <Col className={'text-primary'}>
                        Summary Candidates<br/>
                        <p className={'text-body'}>(please select the topic summary that matches your goals the
                            most)</p>
                    </Col>
                </Row>
                {
                    textBoxes.map((textBox, index) => (
                        <Row key={`textBox-${index}`} className="mb-3">
                            <Col className={'d-flex justify-content-between align-items-center'}>
                                <FormControl
                                    as="textarea"
                                    readOnly
                                    placeholder={`TextBox ${index + 1}`}
                                    value={textBox}
                                />
                                <Button variant={'primary'}
                                        onClick={() => this.handleClickSelectCandidateBtn(textBox)}>Select</Button>
                                <Button variant={'primary'}
                                        onClick={() => this.handleClickRemoveCandidateBtn(textBox)}>Remove</Button>
                            </Col>
                        </Row>
                    ))
                }
                <Row className="mb-3">
                    <Col>
                        <Button variant="primary"
                                disabled={generateNewSummaryBtnDisabled}
                                onClick={this.handleUpdate}>Generate New Summary</Button>
                        &nbsp;&nbsp;
                        <Button variant="primary"
                                disabled={saveBtnDisabled}
                                onClick={this.handleSave}>Save</Button>
                    </Col>
                </Row>
                {errorRow}
            </Container>
        );
    }

    handleClickRemoveCandidateBtn = (textBox) =>
    {
        this.setState(prevState => ({
            textBoxes: prevState.textBoxes.filter(tb => tb !== textBox),
        }));
    };
}

export default CreateNewTopicPane;
