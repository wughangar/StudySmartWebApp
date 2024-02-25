import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import TopicsList from "./TopicsList";
import {logout, setCurrentView} from "../common/context_interface";
import {connect} from "react-redux";

class SiteSidebar extends React.Component
{
    render()
    {
        const {user} = this.props;
        
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
        setCurrentView(this.props.dispatch,  "createNewTopic");
    };

    onLogoutClicked = () =>
    {
        logout(this.props.dispatch);
    };
}

const mapStateToProps = state => ({
    user: state.users.user,
});

export default connect(mapStateToProps)(SiteSidebar);
