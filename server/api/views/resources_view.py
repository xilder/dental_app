from flask import abort, make_response, jsonify, request
from api.views import resource_view
from models.engine.db import db_client
from flask import request


@resource_view.route("/doctors", methods=["GET"])
def get_doctors():
    """Returns all doctors"""
    final_list = []
    doctor_list = db_client.find_obj_by("doctor").all()

    for doctor in doctor_list:
        doc_data = {}
        doctor = doctor.to_json()
        doc_data["first_name"] = doctor.get("first_name")
        doc_data["last_name"] = doctor.get("last_name")
        doc_data["rank"] = doctor.get("rank")
        doc_data["email"] = doctor.get("email")
        doc_data["about"] = doctor.get("about")
        doc_data["specialities"] = doctor.get("specialities")
        final_list.append(doc_data)

    return make_response(jsonify(final_list), 200)


@resource_view.route("/appointments", methods=["POST"])
def add_appointment():
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


@resource_view.route("/appointments/<id>", methods=["GET"])
def get_appointment(id: str):
    """get one appointment for editing"""
    if not id:
        abort(404)
    appointment = db_client.find_obj_by("appointment", id=id).first()
    if not appointment:
        abort(404)
    return make_response(jsonify(appointment.to_json()))


@resource_view.route("/patient_appointments/<id>", methods=["GET"])
def get_patient_appointments(id: str):
    """get all appointments for a patients"""
    full_list = []
    if not id:
        abort(404)
    appointments = db_client.find_obj_by("appointment", patient_id=id).all()
    if not appointments:
        return make_response(jsonify({"error": "No appointments found"}), 404)
    for appointment in appointments:
        appointment_data = {}
        appointment = appointment.to_json()
        doctor_id = appointment["doctor_id"]
        appointment_data["doctor_name"] = db_client.get_name_by_id(doctor_id)
        appointment_data["time"] = appointment["appointment_time"]
        appointment_data["complaints"] = appointment["complaints"]
        full_list.append(appointment_data)
    return make_response(jsonify(full_list), 200)


@resource_view.route("/get_name/<id>", methods=["GET"])
def get_name_by_id(id: str):
    if not id:
        return make_response(jsonify(error="No ID"), 403)
    name = db_client.get_name_by_id(id=id)
    if not name:
        return make_response(jsonify(error="Not a user"), 403)
    return make_response(jsonify(name=name), 200)
