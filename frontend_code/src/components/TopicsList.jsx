import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import {getTopicsForUser} from "../common/backend_interface";
import {setCurrentTopic} from "../common/context_interface";
import {Col, Container, Row} from "react-bootstrap";
import {connect} from "react-redux";

class TopicsList extends React.Component
{
    componentDidMount()
    {
        getTopicsForUser(this.props.dispatch, this.props.user._id)
    }

    onTopicClicked(topic)
    {
        setCurrentTopic(this.props.dispatch, topic);
    }
    
    renderList()
    {
        const {user, currentTopic, topics} = this.props;


        return topics.map((topic, index) =>
                          {

                              let bgColor = "white";

                              if(currentTopic != null && topic.topic_id === currentTopic.topic_id)
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
        if(!this.props.topics)
        {
            return "No topics found."
        }
            
        
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

}

const mapStateToProps = state => ({
    user: state.users.user,
    currentTopic: state.topics.currentTopic,
    topics: state.topics.topics
});

export default connect(mapStateToProps)(TopicsList);
