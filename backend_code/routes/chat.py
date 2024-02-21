from openai import OpenAI
from flask import jsonify, request, Blueprint

client = OpenAI(api_key="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")
chat_bp = Blueprint('notes', __name__)

@chat_bp.route('/learn', methods=['POST'])
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
