import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {AppContext} from "./StoreProvider";
import TopicsList from "./TopicsList";
import {logout, setCurrentView} from "../common/context_interface";

class SiteSidebar extends React.Component
{
    static contextType = AppContext;

    render()
    {
        const {state} = this.context;
        const {user}  = state;

        return (
            <Container fluid className="card card-body mt-2">
                <Row>
                    <Col>
                        <p className={'text-body h5'}>Welcome, {user.username}!</p>
                        [<a className={'link-primary'} href={"#"} onClick={this.onLogoutClicked}>Logout</a>]
                        <hr className="bg-primary" style={{height: '4px'}}/>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <a className={'link-primary'} href="#" onClick={this.onAddNewTopicClicked}>Add new topic...</a>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <TopicsList/>
                    </Col>
                </Row>
            </Container>
        );
    }

    onAddNewTopicClicked = () =>
    {
        setCurrentView(this.context, "createNewTopic");
    };

    onLogoutClicked = () =>
    {
        logout(this.context);
    };
}

export default SiteSidebar;
