import React from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {setCurrentUser, setLoadingDialogStatus} from "../common/context_interface";
import {getTestUserFromDB} from "../common/backend_interface";
import {connect} from "react-redux";

class DevView extends React.Component
{
    SHOW = true;

    devLoginBtnClicked = () =>
    {
        const testUser = getTestUserFromDB();
        setCurrentUser(this.props.dispatch, testUser);
    };

    devLogoutBtnClicked = () =>
    {
        setCurrentUser(this.props.dispatch, null);
    };
    clearBrowserDataClicked = () =>
    {
        window.localStorage.setItem('myContent', JSON.stringify({}));
        setCurrentUser(this.props.dispatch, null);
    };

    testProgressClicked = async() =>
    {
        const max = 100;

        for(let i = 0; i < max; ++i)
        {

            this.props.dispatch({
                                    type: "SET_PROGRESS",
                                    payload: {
                                        progress: i / max,
                                        stepName: "Processing...",
                                    },
                                });

            // Wait for 5 seconds
            await new Promise(resolve => setTimeout(resolve, 22));
        }

        // Now set progress to 1.0
        this.props.dispatch({
                                type: "SET_PROGRESS",
                                payload: {
                                    progress: 1.0,
                                    stepName: "Complete",
                                },
                            });

        await new Promise(resolve => setTimeout(resolve, 1000));
        this.props.dispatch({
                                type: "SET_PROGRESS",
                                payload: null,
                            });
    };

    testLoadingDialogClicked = () =>
    {
        setLoadingDialogStatus(this.props.dispatch, "Loading!")
    }
    
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
                                    disabled={this.props.user !== null}>DEV: Login</Button>

                            <Button className={'mx-1'}
                                    onClick={this.devLogoutBtnClicked}
                                    disabled={this.props.user === null}>DEV: Logout</Button>

                            <Button className={'mx-1'}
                                    onClick={this.clearBrowserDataClicked}>
                                Clear Browser Data</Button>

                            <Button className={'mx-1'}
                                    onClick={this.testProgressClicked}>
                                Test Progress Dialog</Button>

                            <Button className={'mx-1'}
                                    onClick={this.testLoadingDialogClicked}>
                                Test Loading Dialog</Button>

                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

  
}

const mapStateToProps = state => ({
    user: state.users.user,
});

export default connect(mapStateToProps)(DevView);
