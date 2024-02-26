import {setLoadingDialogStatus, setTopicChapter} from "../common/context_interface";
import {generateStudyGuideChapter} from "../common/backend_interface";
import ReactMarkdown from "react-markdown";
import {Accordion, Button, Col, Container, Row} from "react-bootstrap";
import React, {Component} from "react";
import {Book} from "react-bootstrap-icons";

class Chapter extends Component
{
    onGenerateClicked = () =>
    {
        setLoadingDialogStatus(this.props.dispatch, `Generating chapter ${this.props.chapter.chapter_index}...`);
        generateStudyGuideChapter(this.props.dispatch, this.props.topic_id, this.props.chapter.chapter_index);
    };

    onChapterClicked = (e, chapter) =>
    {
        e.preventDefault();
        console.log("On chapter clicked: ", chapter);
        setTopicChapter(this.props.dispatch, chapter);
    };

    render()
    {
        let chapter = this.props.chapter;
        let body    = null;

        if(chapter.body)
        {
            body = (<li className="list-group-item bg-secondary">
                <span className="mb-0 text-primary"><ReactMarkdown>{chapter.body}</ReactMarkdown></span>
            </li>);
        }
        else
        {
            body = (<li className="list-group-item bg-secondary">
                <Button className={'btn-sm'} onClick={this.onGenerateClicked}>Generate Chapter</Button>
            </li>);

        }

        const btnDisabled     = !chapter.body;
        const backgroundColor = btnDisabled ? "#f00" : "#0f0";

        return (
            <Accordion className={'card'}>
                <Accordion.Item eventKey="0" style={{backgroundColor: backgroundColor}}>
                    <Accordion.Header>
                        <Button disabled={btnDisabled}
                                onClick={(e) => this.onChapterClicked(e, chapter)}
                                className={'p-1'} variant={'primary'}>
                            <Book color="white" size={32}/>
                        </Button>
                        &nbsp;&nbsp;&nbsp;<p
                        className="mb-0 fw-bold text-secondary">{chapter.chapter_index}. {chapter.title}</p>
                        <p className="mx-2 mb-0 fst-italic ">({chapter.extra_description})</p>
                    </Accordion.Header>
                    <Accordion.Body className={'bg-primary'}>
                        {body}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
            ;
    }
}

// Chapters List Component
class ChaptersList extends Component
{
    onGenerateMoreChaptersClicked = () =>
    {
        // TODO: implement    
    };

    render()
    {
        const chapters     = this.props.topic.study_guide.chapters;
        const chaptersList = chapters.map((chapter, idx) => (
            <Chapter dispatch={this.props.dispatch}
                     key={`chapter-${idx}`}
                     topic_id={this.props.topic._id}
                     chapter={chapter}/>));
        return (
            <Container fluid>
                <Row>
                    <Col>

                        <ul className="list-group">
                            {chaptersList}
                        </ul>
                    </Col>
                </Row>
                <Row className={'btn-sm mt-3'}>
                    <Col>
                        <Button onClick={this.onGenerateMoreChaptersClicked}>Generate More Chapters! </Button>
                    </Col>
                </Row>
            </Container>);
    }
}

export default ChaptersList;
