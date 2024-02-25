import React from 'react';
import {Button, Col, Container, FormControl, Row} from 'react-bootstrap';
import {askAI, createNewTopic, generateSummaryForTopic} from "../common/backend_interface";
import {
    insertTopicSummary,
    removeTopicSummary,
    setCurrentView,
    setLoadingDialogStatus,
} from "../common/context_interface";
import {connect} from "react-redux";

class CreateNewTopicPane extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            topicTitle: '',
            bestSummary: null,
            errorMsg: null,
        };
    }

    onInputChanged = (event) =>
    {
        this.setState({topicTitle: event.target.value});
    };


    onGenerateNewSummaryClicked = (event) =>
    {
        // Do something for updating the topic
        event.preventDefault();
        const {topicTitle} = this.state;
        generateSummaryForTopic(this.props.dispatch, topicTitle)
        setLoadingDialogStatus(this.props.dispatch, "Generating a summary...")
    };

    onSaveClicked = (event) =>
    {
        const {topicTitle, bestSummary} = this.state;
        console.log(topicTitle, bestSummary);

        const topic = {
            userid: this.props.user._id,
            title: topicTitle,
            summary: bestSummary,
        };

        createNewTopic(this.props.dispatch, topic);
        setCurrentView(this.props.dispatch, "default");
    };

    onRemoveCandidateClicked = (textBox) =>
    {
        removeTopicSummary(this.props.dispatch, textBox);
    };

    onCancelClicked = () =>
    {
        setCurrentView(this.props.dispatch, "default");
    };

    addSummaryCandidate = (answer) =>
    {
        insertTopicSummary(this.props.dispatch, answer);
    };

    onSelectCandidateClicked = (textBox) =>
    {
        if(this.state.bestSummary)
        {
            // Remove the old best summary
            insertTopicSummary(this.props.dispatch, this.state.bestSummary);
        }
        
        removeTopicSummary(this.props.dispatch, textBox)
        this.setState({bestSummary: textBox});
    };

    render()
    {
        const {errorMsg, topicTitle, bestSummary} = this.state;
        const {topicSummaries}                    = this.props;

        const errorRow = errorMsg === null ? null : (
            <Row>
                <Col>
                    <p className={'text-danger'}>ERROR: {errorMsg}</p>
                </Col>
            </Row>
        );

        const generateNewSummaryBtnDisabled = topicTitle.length === 0;
        const saveBtnDisabled               = generateNewSummaryBtnDisabled || bestSummary === null;


        let topicRows = null;

        if(topicSummaries)
        {
            topicRows = topicSummaries.map((textBox, index) => (
                <Row key={`textBox-${index}`} className="mb-3">
                    <Col className={'d-flex justify-content-between align-items-center'}>
                        <FormControl
                            as="textarea"
                            readOnly
                            placeholder={`TextBox ${index + 1}`}
                            value={textBox}
                        />
                        <Button className={'mx-1'} variant={'primary'}
                                onClick={() => this.onSelectCandidateClicked(textBox)}>Select</Button>
                        <Button variant={'primary'}
                                onClick={() => this.onRemoveCandidateClicked(textBox)}>Remove</Button>
                    </Col>
                </Row>
            ));
        }
        const bestSummaryRow = bestSummary === null ? null : (
            <>
                <Row className="mb-1">
                    <Col className={'text-primary'}>
                        Best Summary
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <FormControl
                            as="textarea"
                            readOnly
                            className={'bg-secondary'}
                            placeholder={`bestSummary`}
                            value={bestSummary}
                        />
                        <hr className="bg-primary" style={{height: '4px'}}/>
                    </Col>
                </Row>
            </>
        );

        return (
            <Container className={'card card-body'}>
                <Row>
                    <Col className={'text-primary'}>
                        What would you like to learn about?
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col>
                        <FormControl
                            type="text"
                            placeholder="Enter topic..."
                            value={this.state.topicTitle}
                            onChange={this.onInputChanged}
                        />
                        <hr className="bg-primary" style={{height: '4px'}}/>
                    </Col>

                </Row>
                {bestSummaryRow}

                <Row>
                    <Col className={'text-primary'}>
                        Summary Candidates<br/>
                        <p className={'text-body'}>Please select the topic summary that matches your goals the most.
                            This will help guide the AI assistance.
                            <br/>
                            Click Generate New Summary to generate a summary candidate based on the topic.
                        </p>
                    </Col>

                </Row>
                {topicRows}
                <Row className="mb-3">
                    <Col>
                        <Button variant="primary"
                                disabled={generateNewSummaryBtnDisabled}
                                onClick={this.onGenerateNewSummaryClicked}>Generate New Summary</Button>
                    </Col>
                </Row>
                <Row className="mt-1">

                    <Col>
                        <hr className="bg-primary" style={{height: '4px'}}/>
                        <Button variant="primary"
                                onClick={this.onCancelClicked}>Cancel</Button>
                        <Button variant="primary"
                                disabled={saveBtnDisabled}
                                onClick={this.onSaveClicked}>Save</Button>

                    </Col>
                </Row>
                {errorRow}
            </Container>
        );
    }

}

const mapStateToProps = state => ({
    user: state.users.user,
    topicSummaries: state.topics.topicSummaries,
});

export default connect(mapStateToProps)(CreateNewTopicPane);
