import React from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {AppContext} from "./StoreProvider";
import {isLoggedIn, setCurrentUser} from "../common/context_interface";
import {getUserFromDB} from "../common/db_interface";

class DevView extends React.Component
{
    static contextType = AppContext;
    
    SHOW = false;
    
    devLoginBtnClicked = () =>
    {
        setCurrentUser(this.context, getUserFromDB(null, null));
    };

    devLogoutBtnClicked = () =>
    {
        setCurrentUser(this.context, null);
    };

    render()
    {
        if(!this.SHOW)
        {
             return null;   
        }
        
        return (
            <Container fluid className="card card-body mt-5" style={{
                backgroundColor: "#220000", border: "3px solid red",
            }}>
                <Row>
                </Row>
                <Row className="mb-1">
                    <Col>
                        <p>These are development tools, remove before publishing to the public</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={this.devLoginBtnClicked} disabled={isLoggedIn(this.context)}>DEV:
                            Login</Button>
                        <Button onClick={this.devLogoutBtnClicked} disabled={!isLoggedIn(this.context)}>DEV:
                            Logout</Button>
                        <Button onClick={this.clearBrowserDataClicked}>Clear Browser Data</Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    clearBrowserDataClicked = () =>
    {
        window.localStorage.setItem('myContent', JSON.stringify({}));
        setCurrentUser(this.context, null);
    };
}

export default DevView;
