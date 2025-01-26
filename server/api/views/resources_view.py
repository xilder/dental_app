from flask import abort, make_response, jsonify, request, session
from api.views import resource_view
from models.engine.db import db_client
from flask import request


@resource_view.route("/doctors", methods=["GET"])
def get_doctors():
    """Returns all doctors"""
    doctor_list = db_client.find_obj_by("doctor").all()
    doctor_list = [doctor.to_json() for doctor in doctor_list]

    return make_response(jsonify(doctor_list), 200)


@resource_view.route("/appointments", methods=["POST"])
def add_appointment():
    try:
        appointment_data = request.get_json()
        # print(appointment_data)
        if not appointment_data:
            return make_response(jsonify({"error": "No data provided"}), 400)
        appointment = db_client.add("appointment", **appointment_data)
        if not appointment:
            return make_response(
                jsonify(
                    {"error": "An error occurred while creating the appointment"}
                ),
                500,
            )
        return make_response(
            jsonify({"message": "Appointment created successfully"}), 200
        )
    except Exception:
        print(f"query for {request.url} failed")
        return make_response(jsonify('Internal server error'), 500)


@resource_view.route("/appointments/<id>", methods=["GET"])
def get_appointment(id: str):
    """get one appointment for editing"""
    try:
        if not id:
            abort(404)
        appointment = db_client.find_obj_by("appointment", id=id).first()
        if not appointment:
            abort(404)
        return make_response(jsonify(appointment.to_json()))
    except Exception:
        print(f"query for {request.url} failed")
        return make_response(jsonify('Internal server error'), 500)


@resource_view.route("/patient_appointments/<id>", methods=["GET"])
def get_patient_appointments(id: str):
    """get all appointments for a patients"""
    try:
        if not id or id != session['user_id']:
            abort(404)
        appointments = db_client.find_obj_by("appointment", patient_id=id).all()
        if not appointments:
            return make_response(jsonify({"error": "No appointments found"}), 404)
        new_list = []
        appointments = [appointment.to_json() for appointment in appointments]
        # print(appointments)
        for appointment in appointments:
            # print(appointment)
            appointment["doctor_name"] = db_client.get_name_by_id(appointment["doctor_id"])
            new_list.append(appointment)

        return make_response(jsonify(new_list), 200)
    except Exception as e:
        # print(f"query for {request.url} failed")
        print(e)
        return make_response(jsonify('Internal server error'), 500)



@resource_view.route("/get_name/<id>", methods=["GET"])
def get_name_by_id(id: str):
    try:
        if not id:
            return make_response(jsonify(error="No ID"), 403)
        name = db_client.get_name_by_id(id=id)
        if not name:
            return make_response(jsonify(error="Not a user"), 403)
        return make_response(jsonify(name=name), 200)
    except Exception:
        print(f"query for {request.url} failed")
        return make_response(jsonify('Internal server error'), 500)
