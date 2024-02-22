import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';

const logo = process.env.PUBLIC_URL + '/logo512.png';

const SiteSidebar = () => {
    return (
        <Container fluid className='bg-secondary p-2 m-0'>
            <Row>
                <Col>
                    This is the sidebar
                </Col>
            </Row>
            <Row>
                <Col>
                    Some item 1
                </Col>
            </Row>
            <Row>
                <Col>
                    Some item 2
                </Col>
            </Row>
            <Row>
                <Col>
                    Some item 3
                </Col>
            </Row>
            <Row>
                <Col>
                    Some item 4
                </Col>
            </Row>
        </Container>
    )
};

export default SiteSidebar;
