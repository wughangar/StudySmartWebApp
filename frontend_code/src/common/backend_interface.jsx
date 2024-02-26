import {
    closeLoadingDialog,
    insertTopicSummary,
    setCurrentTopic,
    setCurrentUser,
    setCurrentView, setLoadingDialogStatus,
    setTopicQA,
    setTopicsList,
} from "./context_interface";
import {POST} from "./fetch";

export const getUserFromDB = (username = null, userid = null) =>
{
    // TODO: Implement this


    if(username == null && userid == null)
    {
        return null;
    }

    return null;
};

export const loginUser = (dispatch, username, password) =>
{
    const url = '/login';

    const data = {
        username: username,
        password: password,
    };

    POST(url, data)
        .then(response =>
              {
                  console.log(response);

                  if(response.status === 200)
                  {
                      response.json().then((data) =>
                                           {
                                               console.log("SUCCESS!", data);
                                               setCurrentUser(dispatch, data.user);
                                           });
                  }
                  else
                  {
                      console.log(response.message); // log out error message
                  }
              })
        .catch((error) =>
               {
                   console.error('Error:', error);
               });
};

export const registerUser = (dispatch, username, password, email, name) =>
{
    const url  = '/signup';
    const data = {
        username: username,
        password: password,
        email: email,
    };

    POST(url, data)
        .then(response =>
              {
                  response.json().then((data) =>
                                       {
                                           setCurrentUser(dispatch, data.user);
                                           setCurrentView(dispatch, "default");
                                       });

              })
        .catch((error) =>
               {
                   console.error('Error:', error);
               });
};

export const getTopicsForUser = (dispatch, userid) =>
{
    const data = {
        userid: userid,
    };

    const url = '/topics/by_user';

    POST(url, data).then(response =>
                         {
                             if(response.status === 200)
                             {
                                 response.json().then(
                                     (data) =>
                                     {
                                         setTopicsList(dispatch, data['topics']);
                                     });
                             }
                             else
                             {
                                 console.log(response.message); // log out error message
                             }
                         })
                   .catch((error) =>
                          {
                              console.error('Error:', error);
                          });


};

export const createNewTopic = (dispatch, topic) =>
{
    const url = '/topics';

    console.log("THE TOPIC: ", topic);
    POST(url, topic)
        .then((response) =>
              {
                  if(response.status === 200)
                  {
                      const jsonData = response.json();

                      if('error' in jsonData)
                      {
                          dispatch({
                                       type: 'POPUP_ERROR',
                                       payload: jsonData['error'],
                                   });
                      }
                      else
                      {
                          // Refresh the topics list
                          setCurrentTopic(dispatch, jsonData['topic']);
                      }
                  }
              });

};

export const generateSummaryForTopic = (dispatch, topicTitle) =>
{
    const url = '/topics/generate_summary';

    POST(url, {'topic_title': topicTitle})
        .then((response) =>
              {
                  if(response.status === 200)
                  {
                      response.json().then((jsonData) =>
                                           {

                                               if('error' in jsonData)
                                               {
                                                   dispatch({
                                                                type: 'POPUP_ERROR',
                                                                payload: jsonData['error'],
                                                            });
                                               }
                                               else
                                               {
                                                   console.log("AI: ", jsonData);
                                                   // Refresh the topics list
                                                   insertTopicSummary(dispatch, jsonData['summary']);
                                               }

                                               closeLoadingDialog(dispatch);
                                           });
                  }
              });
};

export const generateQuizForTopic = (dispatch, topic_id, chapter_index = null) =>
{
    console.log("generateQuizForTopic: topic_id: ", topic_id);
    const url = '/topics/generate_quiz';

    POST(url, {'topic_id': topic_id, 'chapter_index': chapter_index})
        .then((response) =>
              {
                  if(response.status === 200)
                  {
                      response.json().then(
                          (jsonData) =>
                          {
                              console.log("generateQuizForTopic: jsonData: ", jsonData);

                              if('error' in jsonData)
                              {
                                  dispatch({
                                               type: 'POPUP_ERROR',
                                               payload: jsonData['error'],
                                           });
                              }
                              else
                              {
                                  setCurrentTopic(dispatch, jsonData['topic']);
                              }

                              closeLoadingDialog(dispatch);
                          });
                  }
              });
};

export const generateStudyGuideForTopic = (dispatch, topic_id) =>
{
    const url = '/topics/generate_study_guide';

    POST(url, {'topic_id': topic_id})
        .then((response) =>
              {
                  if(response.status === 200)
                  {
                      response.json().then((jsonData) =>
                                           {

                                               if('error' in jsonData)
                                               {
                                                   dispatch({
                                                                type: 'POPUP_ERROR',
                                                                payload: jsonData['error'],
                                                            });
                                               }
                                               else
                                               {
                                                   setCurrentTopic(dispatch, jsonData['topic']);
                                               }

                                               closeLoadingDialog(dispatch);
                                           });
                  }
              });
};

export const generateStudyGuideChapter = (dispatch, topic_id, chapter_index) =>
{
    const url = '/topics/generate_study_guide_chapter';

    POST(url, {
        'topic_id': topic_id,
        'chapter_index': chapter_index,
    })
        .then((response) =>
              {
                  if(response.status === 200)
                  {
                      response.json().then(
                          (jsonData) =>
                          {

                              if('error' in jsonData)
                              {
                                  dispatch({
                                               type: 'POPUP_ERROR',
                                               payload: jsonData['error'],
                                           });
                              }
                              else
                              {
                                  setCurrentTopic(dispatch, jsonData['topic']);
                              }

                              closeLoadingDialog(dispatch);
                          });
                  }
              });
};


export const askTopicQuestion = (dispatch, topic_id, question, chapter_index = null) =>
{
    const url  = "/topics/answer_question";
    const data = {
        topic_id,
        question,
        chapter_index,
    };


    POST(url, data).then(
        (response) =>
        {
            if(response.status === 200)
            {
                response.json().then(
                    (jsonData) =>
                    {
                        setCurrentTopic(dispatch, jsonData['topic'])
                        
                        setTopicQA(dispatch, {
                            topic_id,
                            chapter_index,
                            question,
                            answer: jsonData['answer'],
                        });
                        
                        setLoadingDialogStatus(dispatch, null)
                    });

            }
            else
            {
                dispatch({
                             type: 'POPUP_ERROR',
                             payload: `Error occurred while asking question: ${response.body}`,
                         });
            }
        });

};
