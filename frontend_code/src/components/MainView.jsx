import {Button, Col, Container, Row} from 'react-bootstrap';
import SiteHeader from "./SiteHeader";
import SiteSidebar from "./SiteSidebar";
import ContentArea from "./ContentArea";
// logo512.png is in the public folder
import {AppContext} from './StoreProvider';
import React, {useContext} from 'react';

const MainView = () => {
    const {state, dispatch} = useContext(AppContext);

    const btnClicked = () => {
        dispatch({type: "SET_USER", payload: {user: "John Doe"}})}
    
    const {user} = state;

    console.log(state)
    return (
        
        <Container fluid>
            <Row className="mb-1">
                <Col>
                    <SiteHeader/>
                </Col>
            </Row>
            <Row className="m-0 p-0">
                <Col className={' m-0 p-1'} md={3}>
                    <SiteSidebar/>
                </Col>
                <Col className={' m-0 p-1'} md={9}>
                    <ContentArea/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={btnClicked}>Clicky</Button>
                    <p>{user}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default MainView;
