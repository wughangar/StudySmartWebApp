import React from "react";
import '../css/bootstrap.min.css';
import {getUserFromDB, loginUser} from "../common/backend_interface";
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {setCurrentUser, setCurrentView} from "../common/context_interface";
import {connect} from "react-redux";

class LoginPane extends React.Component
{


    constructor(props)
    {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMsg: null,
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit         = this.onSubmit.bind(this);
    }

    onUsernameChange(event)
    {
        this.setState({...this.state, username: event.target.value});
    }

    onPasswordChange(event)
    {
        this.setState({...this.state, password: event.target.value});
    }

    onSubmit(event)
    {
        event.preventDefault();
        const {username, password} = this.state;

        if(loginUser(this.props.dispatch, username, password))
        {
            this.setState({...this.state, errorMsg: null});
        }
        else
        {
            this.setState({...this.state, errorMsg: "The username or password is incorrect!"});
        }

        const userObj = getUserFromDB(username);

        if(userObj != null)
        {
            setCurrentUser(this.props.dispatch, userObj);
        }
    }

    onRegisterClicked = () =>
    {
        setCurrentView(this.props.dispatch, "register");
    };
    
    render()
    {
        const {username, password, errorMsg} = this.state;

        const submitButtonEnabled = username.length > 0 && password.length > 0;

        const errorSection = errorMsg == null ? null : (
            <Row className={' mt-2'}>
                <Col>
                    <p className={'text-danger'}>ERROR: {errorMsg}</p>
                </Col>
            </Row>
        );

        return (
            <Container className={'card card-body mt-5'}>
                <Row>
                    <Col>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" onChange={this.onUsernameChange} value={username}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={this.onPasswordChange} value={password}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={!submitButtonEnabled}>Submit</Button>
                            &nbsp;&nbsp;&nbsp;Or <a href={"#"} onClick={this.onRegisterClicked}>Register</a>...
                        </Form>
                    </Col>

                </Row>
                {errorSection}
            </Container>
        );
    }

}

const mapStateToProps = state => ({
    user: state.users.user,
});

export default connect(mapStateToProps)(LoginPane);
