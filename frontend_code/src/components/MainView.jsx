import {Col, Container, Row} from 'react-bootstrap';
import SiteHeader from "./SiteHeader";
import SiteSidebar from "./SiteSidebar";
import ContentArea from "./ContentArea";
import {AppContext} from './StoreProvider';
import React, {Component} from 'react';
import LoginPane from "./LoginPane";
import DevView from "./DevView";
import RegisterNewUserPane from "./RegisterNewUserPane";
import CreateNewTopicPane from "./CreateNewTopicPane";
import SiteFooter from "./SiteFooter";


class MainView extends Component
{
    static contextType = AppContext;

    // Update local state when context changes
    constructor(props)
    {
        super(props);
        this.state = {
            localState: this.context,
        };
    }

    componentDidMount()
    {
    }

    componentDidUpdate(prevProps, newProps, something)
    {
        if(this.context !== this.state.localState)
        {
            this.setState({localState: this.context});
        }
    }

    render()
    {
        const {currentView, user} = this.context.state;

        let contentArea = null;
        let sidebarArea = null;

        console.log(`MAIN VIEW: ${currentView}`);
        if(user != null && currentView === "default")
        {
            contentArea = <ContentArea/>;
            sidebarArea = (
                <Col className={'m-0 p-1'} md={3}>
                    <SiteSidebar/>
                </Col>
            );
        }
        else if(currentView === "register")
        {
            contentArea = <RegisterNewUserPane/>;
        }
        else if(currentView === "createNewTopic")
        {
            contentArea = <CreateNewTopicPane/>;
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
                        <SiteFooter/>
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
