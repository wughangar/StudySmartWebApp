import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import TopicView from "./TopicView";
import {connect} from "react-redux";

class ContentArea extends React.Component
{
    render()
    {
        const {currentTopic} = this.props;

        let content = null;

        if(currentTopic)
        {
            content = (<TopicView/>);
        }
        else
        {
            if(!this.props.currentTopic)
            {
                content = (
                    <p>Click "Add new topic..." on the sidebar.</p>
                );
            }
        }

        return (
            <Container className="bg-secondary p-2 m-0" fluid>
                <Row>
                    <Col>
                        {content}
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    currentTopic: state.topics.currentTopic,
});

export default connect(mapStateToProps)(ContentArea);
