import json

import requests

# Test POST /users
new_user = {"name": "John Doe", "email": "johndoe@example.com"}
response = requests.post("http://127.0.0.1:5000/users", json=new_user)
print("POST /users:", response.status_code)

user_id = response.json()
# Assume the new user ID is 1, adjust as needed

# Test GET /users/{id}
response = requests.get(f"http://127.0.0.1:5000/users/{user_id}")
print(f"GET /users/{user_id}:", response.status_code)
print(json.dumps(response.json(), indent=4))

# Test PUT /users/{id}
updated_user = {"name": "Jane Doe", "email": "janedoe@example.com"}
response = requests.put(f"http://127.0.0.1:5000/users/{user_id}", json=updated_user)
print(f"PUT /users/{user_id}:", response.status_code)
print(json.dumps(response.json(), indent=4))

response = requests.get(f"http://127.0.0.1:5000/users/{user_id}")
print(f"GET /users/{user_id}:", response.status_code)
print(json.dumps(response.json(), indent=4))

# Test DELETE /users/{id}
# response = requests.delete(f"http://127.0.0.1:5000/users/{user_id}")
# print(f"DELETE /users/{user_id}:", response.status_code)
