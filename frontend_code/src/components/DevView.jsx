import React from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {AppContext} from "./StoreProvider";
import {isLoggedIn, setCurrentUser} from "../common/context_interface";
import {getTestUserFromDB} from "../common/backend_interface";

class DevView extends React.Component
{
    static contextType = AppContext;

    SHOW = true;

    devLoginBtnClicked = () =>
    {
        const testUser = getTestUserFromDB();
        setCurrentUser(this.context, testUser);
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
            <>
                <Container fluid className="card card-body mt-5" style={{
                    backgroundColor: "#110000", border: "1px solid #ff0000",
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
                            <Button className={'mx-1'}
                                    onClick={this.devLoginBtnClicked} 
                                    disabled={isLoggedIn(this.context)}>DEV: Login</Button>
                            <Button onClick={this.devLogoutBtnClicked} 
                                    disabled={!isLoggedIn(this.context)}>DEV: Logout</Button>
                            <Button onClick={this.clearBrowserDataClicked}>
                                Clear Browser Data</Button>
                            <Button onClick={this.testProgressClicked}>
                                Test Progress Dialog</Button>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

    clearBrowserDataClicked = () =>
    {
        window.localStorage.setItem('myContent', JSON.stringify({}));
        setCurrentUser(this.context, null);
    };

    testProgressClicked = async () =>
    {
        const max = 100;
        
        for(let i=0; i< max; ++i)
        {
            
            this.context.dispatch({
                                      type: "SET_PROGRESS",
                                      payload: {
                                          progress: i/max,
                                          stepName: "Processing...",
                                      },
                                  });

            // Wait for 5 seconds
            await new Promise(resolve => setTimeout(resolve, 22));
        }

        // Now set progress to 1.0
        this.context.dispatch({
                                  type: "SET_PROGRESS",
                                  payload: {
                                      progress: 1.0,
                                      stepName: "Complete",
                                  },
                              });

        await new Promise(resolve => setTimeout(resolve, 1000));
        this.context.dispatch({
                                  type: "SET_PROGRESS",
                                  payload: null,
                              });
    }
}

export default DevView;
