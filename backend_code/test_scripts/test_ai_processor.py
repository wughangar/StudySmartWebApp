from backend_code.ai.ai_processor import ai_processor

if False:
    response = ai_processor.generate_quiz_questions("Learning strings in python")
    qa_as_json = search_for_json_markdown(response)
    print_json(qa_as_json)

if True:
    response = ai_processor.generate_study_guide(
        {
            "_id": {"$oid": "65db19659e2ba1e21f579f5e"},
            "summary": "The request library in Python is a powerful tool for making HTTP requests and interacting with web APIs. It allows you to easily send GET, POST, PUT, DELETE, and other types of requests to servers and receive responses in return. This library is widely used in web development, data mining, and automation tasks due to its simplicity and flexibility.\n\nTo get started with the request library, you need to install it using pip, the Python package manager. Once installed, you can import the library in your code and start making requests to different URLs. You can customize your requests by adding headers, parameters, and payloads to send along with the request. Additionally, you can handle different types of responses, such as JSON, XML, or text.\n\nOverall, the request library is a great tool for beginners to learn as it provides a straightforward way to interact with web services and APIs. By understanding how to use this library effectively, you can access and manipulate data from various sources on the web, making your Python programming skills more versatile and powerful. Practice using the request library with different APIs to gain hands-on experience and enhance your proficiency in web requests with Python.",
            "title": "Learning python's request library",
            "userid": "65dae5e1c27897d10d7deb9b"
        }
    )
    print(response)
