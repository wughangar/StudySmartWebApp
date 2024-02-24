import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import {getTopicsForUser} from "../common/backend_interface";
import {AppContext} from "./StoreProvider";
import {setCurrentTopic} from "../common/context_interface";
import {Col, Container, Row} from "react-bootstrap";

class TopicsList extends React.Component
{
    static contextType = AppContext;

    constructor()
    {
        super();
        this.state = {
            topics: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
        };
    }

    renderList()
    {
        const {state}              = this.context;
        const {user, focusedTopic} = state;

        const topics = getTopicsForUser(user.user_id);

        return topics.map((topic, index) =>
                          {

                              let bgColor = "white";

                              if(focusedTopic != null && topic.topic_id === focusedTopic.topic_id)
                              {
                                  bgColor = "lightgreen";
                              }

                              return (
                                  <ListGroup.Item
                                      style={{cursor: "pointer", backgroundColor: bgColor}}
                                      onMouseOver={(event) => event.currentTarget.style.backgroundColor = 'lightblue'}
                                      onMouseOut={(event) => event.currentTarget.style.backgroundColor = bgColor}
                                      key={index}
                                      onClick={() => this.onTopicClicked(topic)}>
                                      {topic.title}
                                  </ListGroup.Item>
                              );
                          });
    }

    render()
    {
        return (
            <Container fluid><Row>
                <Col>
                    <ListGroup>
                        {this.renderList()}
                    </ListGroup>

                </Col>

            </Row></Container>
        );
    }

    onTopicClicked(topic)
    {
        setCurrentTopic(this.context, topic);
    }
}

export default TopicsList;
