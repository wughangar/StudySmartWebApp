import {setCurrentUser} from "./context_interface";

export const getUserFromDB = (username = null, userid = null) =>
{
    // TODO: Implement this


    if(username == null && userid == null)
    {
        return null;
    }

    return null;
};

export const loginUser = (context, username, password) =>
{
    const url  = 'http://127.0.0.1:5000/login';
    const data = {
        username: username,
        password: password,
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response =>
              {
                  console.log(response);
                  if(response.status === 200)
                  {
                      response.json().then((data) =>
                                           {
                                               console.log("SUCCESS!", data);
                                               setCurrentUser(context, data.user);
                                               return data;
                                           });
                  }
                  else
                  {
                      console.log(response.message); // log out error message
                      return false;
                  }
              })
        .catch((error) =>
               {
                   console.error('Error:', error);
                   return false;
               });
};

export const getTopicsForUser = (userid) =>
{
    // TODO: Implement this

    return getTestListOfTopicsForTestUser();
};

export const doesUserHaveTopics = (userid) =>
{
    const topics = getTopicsForUser(userid);

    if(!topics)
    {
        return false;
    }

    return topics.length > 0;
};


export const registerUser = (username, password, email, name) =>
{
    const url  = 'http://127.0.0.1:5000/signup';
    const data = {
        username: username,
        password: password,
        email: email,
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .catch((error) =>
               {
                   console.error('Error:', error);
               });
};

export const askAI = (query) => {
    const randomString = Math.random().toString(36).substring(7);
    return {"answer": "This is an example answer from the AI " + randomString};
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
