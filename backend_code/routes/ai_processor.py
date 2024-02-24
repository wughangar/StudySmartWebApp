from openai import OpenAI


class AIProcessor:
    def __init__(self, api_key="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"):
        self.api_key = api_key
        self.client = OpenAI(api_key=self.api_key)

    def initiate_conversation(self, topic):
        initial_message = {"role": "user", "content": f"I want to learn about {topic}"}
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[initial_message]
        )
        ai_response = response.choices[0].message.content
        return ai_response

    def generate_study_guide(self, topic):
        messages = [{"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Generate a study guide for {topic}."}]
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        return response.choices[0].message.content

    def generate_quiz_questions(self, topic):
        messages = [{"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Generate quiz questions for {topic}."}]
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        return response.choices[0].message.content  # and here

    def explain_topic(self, topic):
        messages = [{"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Explain {topic}."}]
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        return response.choices[0].message.content


ai_processor = AIProcessor()
