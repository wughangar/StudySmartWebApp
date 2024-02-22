import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';

const logo = process.env.PUBLIC_URL + '/logo512.png';

const ContentArea = () => {
    return (
        <Container className='bg-secondary p-2 m-0' fluid>
            <Row>
                <Col>
                    This is the content for the current page.
                    
                    <p>
                        Today: Learn things
                    </p>
                </Col>
            </Row>
        </Container>
    )
};

export default ContentArea;
