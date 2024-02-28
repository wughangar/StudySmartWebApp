import React from 'react';
import {Accordion, Button, Card} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import {Book} from "react-bootstrap-icons";

class TopicQAView extends React.Component
{
    render()
    {
        const questions = this.props.questions.map(
            (qa, idx) =>
            {
                
                return (
                    <Accordion className={'card'}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header >
                                <p className={'my-0 text-warning'}>{qa.question}</p>
                            </Accordion.Header>
                            <Accordion.Body className={'bg-secondary'}>
                                <ReactMarkdown>{qa.answer}</ReactMarkdown>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>);

            });

        return (
            <Accordion defaultActiveKey="0">
                {questions}
            </Accordion>
        );
    }
}

export default TopicQAView;
