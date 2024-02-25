### This method exists because the _id field from MongoDB records is not 
### able to be represented in JSON.  So, this converts the _id to a string
import json
import re


def fix_mongodb_record_for_jsonify(json_dict: dict):
    if '_id' in json_dict:
        json_dict['_id'] = str(json_dict['_id'])

    return json_dict


def search_for_json_markdown(src: str):
    try:
        pattern = re.compile(r"```json(.*?)```", re.DOTALL)
        matches = pattern.findall(src)

        for match in matches:
            stripped = match.strip()
            try:
                json_found = json.loads(stripped)
                return json_found
            except json.JSONDecodeError:
                continue
    except Exception as e:
        print("Exception caught while searching for json markdown: ", e)
        return None
    return None


def print_json(json_dict: dict):
    print(json.dumps(json_dict, indent=4))
