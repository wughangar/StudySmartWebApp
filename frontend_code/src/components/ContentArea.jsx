import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {AppContext} from "./StoreProvider";
import TopicView from "./TopicView";
import {doesUserHaveTopics} from "../common/backend_interface";

class ContentArea extends React.Component
{
    static contextType = AppContext;

    render()
    {
        const {state}        = this.context;
        const {focusedTopic} = state;

        let content = null;

        if(focusedTopic)
        {
            content = (<TopicView/>);
        }
        else
        {
            if(!doesUserHaveTopics())
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

export default ContentArea;
