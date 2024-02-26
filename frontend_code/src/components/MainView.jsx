import {Col, Container, Row} from 'react-bootstrap';
import SiteHeader from "./SiteHeader";
import SiteSidebar from "./SiteSidebar";
import ContentArea from "./ContentArea";
import React, {Component} from 'react';
import LoginPane from "./LoginPane";
import DevView from "./DevView";
import RegisterNewUserPane from "./RegisterNewUserPane";
import CreateNewTopicPane from "./CreateNewTopicPane";
import SiteFooter from "./SiteFooter";
import ProgressDialog from "./ProgressDialog";
import {connect} from "react-redux";
import LoadingDialog from "./LoadingDialog";
import {setLoadingDialogStatus, setTopicQA} from "../common/context_interface";
import PopupQADialog from "./PopQADialog";


class MainView extends Component
{
    componentDidMount()
    {
        setLoadingDialogStatus(this.props.dispatch, null)
        setTopicQA(this.props.dispatch, null)
    }

    componentDidUpdate(prevProps, newProps, something)
    {
    }

    onProgressCancelClicked = () =>
    {
        this.props.dispatch({
                                type: "SET_PROGRESS",
                                payload: null,
                            });

    };

    render()
    {
        const {user, currentView, progress, loadingDialogStatus} = this.props;

        let contentArea = null;
        let sidebarArea = null;

        console.log(`MAIN VIEW's current view: ${currentView}`);

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

        const showProgress = progress != null;

        const progressElement = !showProgress ?
                                (
                                    <ProgressDialog show={false}/>
                                ) : (
                                    <ProgressDialog show={showProgress}
                                                    progress={progress.percent}
                                                    stepName={progress.stepName}
                                                    onCancel={this.onProgressCancelClicked}/>
                                );


        const loadingDialog = !loadingDialogStatus ? null : (
            <LoadingDialog/>
        );

        return (
            <Container fluid>
                {loadingDialog}
                {progressElement}
                <PopupQADialog question={this.props.currentTopicQA}/>
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

const mapStateToProps = state => ({
    user: state.users.user,
    currentView: state.app.currentView,
    progress: state.app.progress,
    loadingDialogStatus: state.app.loadingDialogStatus,
    currentTopicQA: state.topics.currentTopicQA
});

export default connect(mapStateToProps)(MainView);
