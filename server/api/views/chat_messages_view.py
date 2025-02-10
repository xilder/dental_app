from functools import lru_cache
import math
from flask import abort, make_response, jsonify, session
from sqlalchemy import and_, or_
from sqlalchemy.orm import Query
from api.views import chat_view
from models.engine.db import db_client, T
from models.messages import Message


def paginate(items: list[T], page_number=1, per_page=20):
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


def get_paginated_messages_by_chat(
    query: Query[T], receiver_id: str, page_number: int = 1, per_page: int = 20
):
    messages = query.filter(
        Message.receiver_id == receiver_id or Message.sender_id == receiver_id
    ).all()
    return paginate(messages, page_number, per_page)


@lru_cache(maxsize=256)
def get_grouped_messages(user_id):
    grouped_messages = {}
    # user_id = session['user_id']

    messages = (
        db_client.find_obj_by("message")
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


@chat_view.route("/chat_list", methods=["GET"])
def get_chat_list():
    user_id = session.get("user_id", None)
    if not user_id:
        return make_response(jsonify("User not logged in"), 401)
    try:
        messages = db_client.find_obj_by("message").filter(
            or_(Message.sender_id == user_id, Message.receiver_id == user_id)
        )
        users_ids = messages.with_entities(
            Message.sender_id, Message.receiver_id
        ).all()

        users_ids = list(
            {id for user_row in users_ids for id in user_row if id != user_id}
        )
        all_messages = {}
        # TODO: to make better function to hand message load later
        for id in users_ids:
            messages = (
                db_client.find_obj_by("message")
                .filter(
                    or_(
                        and_(
                            Message.sender_id == id,
                            Message.receiver_id == user_id,
                        ),
                        and_(
                            Message.sender_id == user_id,
                            Message.receiver_id == id,
                        ),
                    )
                )
                .order_by(Message.created_at)
                .all()
            )
            # print(messages)
            all_messages[id] = [message.to_json() for message in messages]
        # print(all_messages)
        return make_response(jsonify(all_messages), 200)
        # return make_response(
        #     jsonify(ids=users_ids, all_messages=all_messages), 200
        # )
    except Exception as e:
        print(e)
        abort(404)
