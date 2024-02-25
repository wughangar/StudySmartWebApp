import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {connect} from "react-redux";

const logo = process.env.PUBLIC_URL + '/logo512.png';

class SiteHeader extends React.Component
{
    render()
    {
        return (
            <Container className="bg-secondary" fluid>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <img src={logo} className="d-block" alt="logo" style={{width: "auto", height: "196px"}}/>
                    </Col>
                </Row>
            </Container>
        );
    }
};

const mapStateToProps = state => ({
    user: state.users.user,
});

export default connect(mapStateToProps)(SiteHeader);
