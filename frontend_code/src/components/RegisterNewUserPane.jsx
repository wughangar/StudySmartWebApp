import React from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {AppContext} from "./StoreProvider";
import {registerUser} from "../common/backend_interface";
import {setCurrentUser, setCurrentView} from "../common/context_interface";

class RegisterNewUserPane extends React.Component
{
    static contextType = AppContext;

    constructor(props)
    {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            name: '',
            email: '',
            errorMsg: null,
        };
    }

    handleChange = (event) =>
    {
        this.setState({
                          ...this.state,
                          [event.target.name]: event.target.value,
                      });

    };

    registerUser = (event) =>
    {
        event.preventDefault();

        const {errorMsg, username, password, confirmPassword, name, email} = this.state;

        if(username.length > 0 &&
           password.length > 0 &&
           password === confirmPassword &&
           name.length > 0 &&
           email.length > 0)
        {
            console.log("Accepted!")
            registerUser(username, password, email, name).then(userObj => {
                setCurrentUser(this.context, userObj)
                setCurrentView(this.context, "default")
            })
            
        }
        
    };

    render()
    {
        const {errorMsg, username, password, confirmPassword, name, email} = this.state;

        let submitEnabled = false;

        if(username.length > 0 &&
           password.length > 0 &&
           password.length === confirmPassword.length &&
           name.length > 0 &&
           email.length > 0)
        {
            submitEnabled = true;
        }

        console.log("Submit Enabled: ", submitEnabled);
        console.log(this.state);

        const errorMsgElement = !errorMsg ? null : (
            <p className="text-danger">Error: {errorMsg}</p>
        );

        return (
            <Container className={'card card-body'}>
                <Row>
                    <Col>
                        <Form onSubmit={this.registerUser}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control name="username" type="text" placeholder="Enter username"
                                              onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Password"
                                              onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password"
                                              onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Enter name"
                                              onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email"
                                              onChange={this.handleChange}/>
                            </Form.Group>

                            <Button variant="primary" type="submit" disabled={!submitEnabled}>
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {errorMsgElement}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default RegisterNewUserPane;
