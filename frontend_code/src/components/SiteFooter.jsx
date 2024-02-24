import React, {Component} from 'react';
import {Col, Container, Row} from 'react-bootstrap';

class SiteFooter extends Component
{
    render()
    {
        return (
            <>
                <br/>
                <br/>
                <Container fluid fixed="bottom" className="bg-secondary">
                    <Row>
                    </Row>
                    <Row>
                        <Col className="text-center py-1">
                            Created by the Goddess (c) 2024
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default SiteFooter;
