import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import SiteHeader from "./SiteHeader";
import SiteSidebar from "./SiteSidebar";
import ContentArea from "./ContentArea";
// logo512.png is in the public folder

const MainView = () => {
    return (
        <Container fluid  >
            <Row className="mb-1">
                <Col>
                    {SiteHeader()}
                </Col>
            </Row>
            <Row className="m-0 p-0">
                <Col className={' m-0 p-1'} md={3}>
                    {SiteSidebar()}
                </Col>
                <Col className={' m-0 p-1'} md={9}>
                    {ContentArea()}
                </Col>

            </Row>
        </Container>
    );
}

export default MainView;
