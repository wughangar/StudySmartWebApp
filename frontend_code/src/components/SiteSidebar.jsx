import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {AppContext} from "./StoreProvider";
import TopicsList from "./TopicsList";
import {logout} from "../common/context_interface";

class SiteSidebar extends React.Component
{
    static contextType = AppContext;

    render()
    {
        const {state} = this.context;
        const {user}  = state;
        
        return (
            <Container fluid className="bg-secondary p-2 m-0">
                <Row>
                    <Col>
                        <p>{user.name} [<a href={"#"} onClick={this.onLogoutClicked}>Logout</a>]</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <a href="#" onClick={this.onAddNewTopicClicked}>Add new topic...</a>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TopicsList/>
                    </Col>
                </Row>
            </Container>
        );
    }

    onAddNewTopicClicked()
    {

    }

    onLogoutClicked = () =>
    {
        logout(this.context)
    }
}

export default SiteSidebar;
