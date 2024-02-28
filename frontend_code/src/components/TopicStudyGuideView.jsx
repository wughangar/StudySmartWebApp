import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import TopicChapterView from './TopicChapterView'; // make sure to have the correct path
import ChaptersList from './TopicChapterList';
import {connect} from "react-redux";
import {setLoadingDialogStatus} from "../common/context_interface";
import {generateStudyGuideForTopic} from "../common/backend_interface"; // make sure to have the correct path

class TopicStudyGuideView extends React.Component {

    onGenerateStudyGuideClicked = () =>
    {
        setLoadingDialogStatus(this.props.dispatch, "Generating study guide...");
        generateStudyGuideForTopic(this.props.dispatch, this.props.currentTopic._id);
    };
    
    render() {
        const { currentTopic, dispatch, currentTopicChapter } = this.props;
        const studyGuide = currentTopic.study_guide;

        if (!studyGuide || !studyGuide.chapters) {
            return (
                <Row className="mt-2">
                    <Col>
                        <Button
                            variant="primary"
                            onClick={this.onGenerateStudyGuideClicked}
                        >
                            Generate a Study Guide!
                        </Button>
                    </Col>
                </Row>
            );
        }

        if (currentTopicChapter) {
            return (
                <Row className="mt-2">
                    <Col>
                        <TopicChapterView/>
                    </Col>
                </Row>
            );
        }

        return (
            <Row className="mt-2">
                <Col>
                    <ChaptersList dispatch={dispatch} topic={currentTopic} />
                </Col>
            </Row>
        );
    }
}


const mapStateToProps = state => ({
    user: state.users.user,
    currentTopic: state.topics.currentTopic,
    currentTopicChapter: state.topics.currentTopicChapter,
    topics: state.topics.topics,
});

export default connect(mapStateToProps)(TopicStudyGuideView);
