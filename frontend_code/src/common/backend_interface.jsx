import {
    closeLoadingDialog,
    insertTopicSummary,
    setCurrentTopic,
    setCurrentUser,
    setCurrentView,
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

export const askAI = (query) =>
{
    const randomString = Math.random().toString(36).substring(7);
    return {"answer": "This is an example answer from the AI " + randomString};
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

export const generateQuizForTopic = (dispatch, topic_id) =>
{
    console.log("generateQuizForTopic: topic_id: ", topic_id);
    const url = '/topics/generate_quiz';

    POST(url, {'topic_id': topic_id})
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

/*********************************************************************/
/** These functions only exist for development. **********************/
/*********************************************************************/
export const getTestUserFromDB = () =>
{
    const userObj = {
        'username': "testuser",
        'name': 'TestUser',
        'password': 'testpassword',
        'user_id': "12345",
    };

    return userObj;
};

export const getTestListOfTopicsForTestUser = () =>
{
    return [
        {
            'topic_id': "1",
            'title': 'Learn strings in python',
            'owner_user_id': "12345",
            'generated_summary': `In Python, \n\n\n\nstrings are sequences of characters, which makes them similar to lists and tuples, and they are declared by enclosing a character sequence within single or double-quotes. Python also supports multi-line strings that can be declared using triple quotes, either ''' or """.
Python strings are immutable, meaning they cannot be changed after they are created. Because of this, operations on strings like adding and replicating create new string objects.
Python provides several built-in methods that can perform operations on strings such as lowercase, uppercase, splitting, stripping, replacing, and more.
Strings can be indexed and sliced to access parts of the string, using a similar notation as lists.\n
String formatting can be done in various ways. Python provides methods such as the format() method or f-strings (since Python 3.6) to embed expressions inside string literals for formatting.
Python also supports Unicode to handle a wide range of characters from different scripts, which can be encoded in various ways such as UTF-8, UTF-16, etc.
A deep understanding of strings is important for handling and manipulating textual data in Python.`,
            'generated_qa': [],
            'user_qa': [],
        },
        {
            'topic_id': "2",
            'title': 'Learn strings in C++',
            'owner_user_id': "12345",
            'generated_summary': `In C++, a string is fundamentally an object of the std::string class in the standard library. This class provides a wide range of methods and functionalities to use and manipulate strings in various ways.
Strings in C++ are dynamic arrays of characters, meaning they can be resized and can hold any number of characters.
Individual characters of a string can be accessed and modified, similar to handling arrays.
Strings in C++ can be easily concatenated using the plus (+) operator.
There are built-in methods to get the length of a string, and many other functionalities, like finding substrings, replacing substrings, and more, all encapsulated within the std::string class.
Remember to include the <string> library when working with strings in C++. The string handling capabilities provided directly in the C++ Standard Library significantly simplifies working with and manipulating text in C++.`,
            'generated_qa': [],
            'user_qa': [{
                "question": "How do I add integers to a string", "answer": "Here is some answer from the AI",
            }],
        }];

};

