from flask import Flask, jsonify, request, Blueprint
from openai import OpenAI

chat_bp = Blueprint('notes', __name__)
app = Flask(__name__)
client = OpenAI(api_key="https://api.openai.com/v1/chat/completions")


@app.route('/learn', methods=['POST'])
def learn_and_converse():
    user_input = request.json.get('user_input')

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": user_input}
        ]
    )

    gpt_response = response.choices[0].message.content

    return jsonify({"response": gpt_response})


if __name__ == '__main__':
    app.run(debug=True)
