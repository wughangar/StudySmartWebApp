import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import TopicsList from "./TopicsList";
import {logout, setCurrentView} from "../common/context_interface";
import {connect} from "react-redux";
import AIChatBoxView from "./AIChatBoxView";

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
                    <Col>
                        <AIChatBoxView/>
                        <hr className="bg-primary" style={{height: '4px'}}/>
                    </Col>
                </Row>
                <Row className={'mt-0'}>
                    <Col className="text-center">
                        Ready to learn something new?<br/> <a className={'link-primary'} href="#" onClick={this.onAddNewTopicClicked}>Click here to create a new topic!</a>
                        <hr className="bg-primary" style={{height: '4px'}}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='fw-bolder text-primary text-center'>Your Topics</p>
                        <TopicsList/>
                    </Col>
                </Row>
            </Container>
        );
    }

    onAddNewTopicClicked = () =>
    {
        setCurrentView(this.props.dispatch, "createNewTopic");
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
