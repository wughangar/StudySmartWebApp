from openai import OpenAI

from backend_code.common.common import search_for_json_markdown, print_json, fix_mongodb_record_for_jsonify
from backend_code.config import OPENAI_API_KEY


class AIProcessor:
    def __init__(self, api_key):
        self.api_key = api_key
        self.client = OpenAI(api_key=self.api_key)

    def _send_messages(self, messages):
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
            ai_response = response.choices[0].message.content
            return ai_response
        except Exception as e:
            print("An error occurred while sending messages to the AI: ", e)
            return None

    def generate_summary(self, topic_title):
        initial_message = {"role": "user",
                           "content": f"I want to learn about {topic_title}.  Please generate a summary for a beginner "
                                      f"that is a maximum of three paragraphs."}

        return self._send_messages([initial_message])

    def generate_study_guide(self, topic):
        instructions = f"""Generate a study guide for {topic['title']}.
            stored in a JSON object printed in a markdown code block. Generate up to 15 chapters. Do not respond with 
            anything but 
            a json object in a markdown code block. It should have the format""" + """
            {
                'chapters': [{'chapter_index': <chapter_number>,  'title': <chapter_title>' 'extra_description': <chapter_extra_description>
            }"""

        messages = [{"role": "system", "content": "You are a helpful teacher."},
                    {"role": "user", "content": instructions
                     }]

        response = self._send_messages(messages)

        if response is None:
            return None

        study_guide_data = search_for_json_markdown(response)

        for chapter in study_guide_data['chapters']:
            chapter['body'] = None

        print_json(fix_mongodb_record_for_jsonify(study_guide_data))

        return study_guide_data

    def generate_study_guide_chapter(self, topic, chapter_index):
        chapter_title = topic['study_guide']['chapters'][chapter_index]

        instructions = f"""Generate a study guide chapter text for the topic: {topic['title']}.  
            The chapter title is: {chapter_title}.
            Generate as many paragraphs as necessary to teach the chapter of this topic.  Only generate text for the 
            chapter and not for the whole topic.
        """

        messages = [{"role": "system", "content": "You are a helpful teacher."},
                    {"role": "user", "content": instructions
                     }]

        chapter_body = self._send_messages(messages)

        return chapter_body

    def generate_quiz_questions(self, topic, chapter_index=None):
        print_json(fix_mongodb_record_for_jsonify(topic))

        if chapter_index is not None:
            print("Generating quiz questions for a CHAPTER!")
            instructions = f"""Generate 10 multiple choice quiz questions with several hints each 
                for the topic "{topic['title']}".    
                
                It must be stored in a JSON object that is printed in a markdown 
                
                code block.  Do not respond with anything but a json object in a markdown code block. It should have the format""" + """
                {
                    'question': <question text>, 
                    'answer_choices': [<answer choice 1>,<answer choice 2>, <answer choice 3>,<answer choice 4>], 
                    'answer_index': <answer_choices index>,
                    'hints': [<hint text>, <hint text>, ...]
                }
                
                The questions should pertain to the following chapter text of the aforementioned topic (or closely 
                related):
                """ + topic['study_guide']['chapters'][chapter_index]['body']
        else:
            print("Generating quiz questions for a TOPIC!")

            instructions = f"""Generate 10 multiple choice quiz questions with several hints each 
                for the topic "{topic['title']}".  It must be stored in a JSON object that is printed in a markdown 
                code block.  Do not respond with anything but a json object in a markdown code block. It should have the format""" + """
                {
                    'question': <question text>, 
                    'answer_choices': [<answer choice 1>,<answer choice 2>, <answer choice 3>,<answer choice 4>],
                    'answer_index': <answer_choices index>, 
                    'hints': [<hint text>, <hint text>, ...]
                }"""

        if len(topic['quiz_questions']) > 0:
            questions_list = map(lambda x: x['question'], topic['quiz_questions'])
            existing_questions = "\n".join(questions_list)
            instructions += f"\nI already have the following questions, so do not use them: {existing_questions}"

        messages = [{"role": "system", "content": "You are a helpful teacher."},
                    {"role": "user", "content": instructions}]

        response = self._send_messages(messages)

        if response is None:
            return None

        questions = search_for_json_markdown(response)

        return questions

    def ask_topic_question(self, topic, question, chapter_index=None):
        if chapter_index is not None:
            print("Generating chapter QA")

            instructions = f"""Generate an answer to the following question within the context of the topic of  "{topic['title']}".    
                The only text returned should be the answer, skip the politeness.  Use several paragraphs if 
                necessary.  The questions 
                should pertain to 
                the following chapter text of the aforementioned topic (or closely 
                related):
                """ + topic['study_guide']['chapters'][chapter_index]['body'] + f"""
                    Use markdown.  Here is the question for you to answer:
                    
                    "{question}"
                """

        else:
            print("Generating topic QA")

            instructions = (f"""Generate an answer to the following question within the context of the topic of  "{topic['title']}".  """ + 
                            f"""The only text returned should be the answer, skip the politeness.  Use several paragraphs if 
                necessary.   Use markdown.  Here is the question 
                            for you to answer: 
                            "{question}" """)


        messages = [{"role": "system", "content": "You are a helpful teacher."},
                    {"role": "user", "content": instructions}]

        return self._send_messages(messages)
        
        

ai_processor = AIProcessor(OPENAI_API_KEY)
