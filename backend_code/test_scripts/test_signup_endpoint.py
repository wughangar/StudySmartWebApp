

import json

import requests

url = 'http://127.0.0.1:5000/signup'
headers = {'Content-Type': 'application/json'}
data = {
    'username': 'test_user',
    'password': 'test_password',
    'email': 'test_user@email.com'
}
response = requests.post(url, headers=headers, data=json.dumps(data))

if response.status_code == 201:
    print("Test: Signup endpoint - Passed")
else:
    print("Error Message: ", response.json().get("message"))
    print("Test: Signup endpoint - Failed")
