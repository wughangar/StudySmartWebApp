import requests

api_key = "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"

def test_openai_api(api_key):
    user_input = input("Enter your input: ")

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    data = {
        "model": "babbage-002",
        "max_tokens": 150,
        "prompt": user_input
    }

    response = requests.post("https://api.openai.com/v1/completions", json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        gpt_response = result['choices'][0]['text']
        print("GPT-3 response:", gpt_response)
    else:
        print("Error:", response.text)

if __name__ == "__main__":
    test_openai_api(api_key)
