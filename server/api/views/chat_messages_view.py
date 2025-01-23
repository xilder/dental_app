from functools import lru_cache
import math
from flask import abort, make_response, jsonify, session
from api.views import chat_view
from models.engine.db import db_client
from models.messages import Message
from sqlalchemy import desc


def paginate(items, page_number=1, per_page=20):
    if page_number < 1:
        page_number = 1
    num_of_items = len(items)
    num_of_pages = math.ceil(num_of_items / per_page)
    remainder = num_of_items % per_page
    start_index = (page_number - 1) * per_page

    if start_index // per_page >= num_of_pages - 1 and remainder != 0:
        end_index = start_index + remainder
    else:
        end_index = start_index + per_page
    return items[start_index:end_index]


@lru_cache(maxsize=256)
def get_grouped_messages(user_id):
    grouped_messages = {}
    # user_id = session['user_id']

    messages = (
        db_client.find_obj_by('message')
        .filter(Message.sender_id == user_id | Message.receiver_id == user_id)
        .order_by(Message.sender_id.desc())
        .all()
    )

    for message in messages:
        other_id = (
            message.sender_id
            if message.sender_id != user_id
            else message.receiver_id
        )
        if other_id not in grouped_messages:
            grouped_messages[other_id] = []
        grouped_messages[other_id].append(message)
    return grouped_messages


@chat_view.route("/history", methods=["GET"])
def chat_history():
    user_id = session.get("user_id", None)
    if not user_id:
        return make_response(jsonify(error="User not logged in"), 401)
    try:
        grouped_messages = get_grouped_messages(user_id)
        return make_response(jsonify(grouped_messages))
    except Exception as e:
        print(e)
        abort(404)
