import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';

const logo = process.env.PUBLIC_URL + '/logo512.png';

const SiteHeader = () => {
    return (
        <Container className='bg-secondary' fluid>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <img src={logo} className="d-block" alt="logo" style={{width: "auto", height: "196px"}}/>
                </Col>
            </Row>
        </Container>
    )
};

export default SiteHeader;
