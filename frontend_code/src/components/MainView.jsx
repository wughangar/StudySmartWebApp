import {Col, Container, Row} from 'react-bootstrap';
import SiteHeader from "./SiteHeader";
import SiteSidebar from "./SiteSidebar";
import ContentArea from "./ContentArea";
import {AppContext} from './StoreProvider';
import React, {Component} from 'react';
import LoginPane from "./LoginPane";
import DevView from "./DevView";
import {setCurrentView} from "../common/context_interface";

class MainView extends Component
{
    static contextType = AppContext;

    componentDidMount()
    {
        const {state}             = this.context;
        const {user, currentView} = state;
        console.log(user, currentView);

        if (currentView === 'login' && user != null)
        {
            setCurrentView(this.context, "default");
            this.setState({view: "default"});

        }
        else
        {
            const view = user != null ? currentView : "login";
            setCurrentView(this.context, view);
            this.setState({view: view});
        }

        this.setState({view: "default"});
    }

    render()
    {
        if(this.state === null)
        {
            return null;
        }
        
        const {view} = this.state;
        const {user} = this.context.state;
        
        let contentArea = null;
        let sidebarArea = null;
        
        if (user != null && view === "default")
        {
            contentArea = <ContentArea/>;
            sidebarArea = (
                <Col className={' m-0 p-1'} md={3}>
                    <SiteSidebar/>
                </Col>
            );
        }
        else 
        {
            contentArea = <LoginPane/>;
        }

        return (

            <Container fluid>
                <Row className="mb-1">
                    <Col>
                        <SiteHeader/>
                    </Col>
                </Row>
                <Row className="m-0 p-0 justify-content-center">
                    {sidebarArea}
                    <Col className={' m-0 p-1'} md={9}>
                        {contentArea}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DevView/>
                    </Col>
                </Row>
            </Container>
        );
    }


}

export default MainView;
