from importlib.util import resolve_name
import os
import MySQLdb
from dotenv import load_dotenv
from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
import configparser

load_dotenv()


def read_mysql_config(mysql_config_file_name: str):
    config = configparser.ConfigParser()
    config.read(mysql_config_file_name)
    return dict(config['client'])


def connect_to_database(config_info):
    '''
    connects to a database and returns a database objects
    '''
    db_connection = MySQLdb.connect(config_info['host'],
                                    config_info['user'],
                                    config_info['password'],
                                    config_info['database'],)
    return db_connection


# just in case we have CORS issues
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# replace with your own login credentials file
# config_info = read_mysql_config(os.environ.get("DB_AUTH_FILE"))
config_info = read_mysql_config("./db_login_serm.js")
db_connection = connect_to_database(config_info)
cursor = db_connection.cursor()
cursor.execute("SET SESSION wait_timeout=604800")
cursor.execute("SET SESSION interactive_timeout=604800")


@app.route('/students', methods=['POST', 'GET'])
@cross_origin()
def get_students():
    '''
    returns all students in the database
    '''
    if request.method == 'GET':
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM students")

        response = {
            'data': [{
                'student_id': student_id,
                'class_id': class_id,
                'student_name': student_name,
                'student_address': student_address,
                'student_email': student_email,
                'student_gpa': student_gpa
            } for (student_id, class_id, student_name, student_address, student_email, student_gpa) in cursor.fetchall()]
        }

        return response

    else:
        '''
        post request, create a new student
        '''
        executeString = "INSERT INTO students (class_id,student_name,student_address,student_email,student_gpa) VALUES"
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeParameter = "("
        for key, values in args.items():
            if "gpa" in key:
                executeParameter += (values + ',')
            elif "class_id" in key:
                # default into every student with calculus
                class_id_execute_string = "(SELECT class_id FROM classes WHERE class_name = {})".format(
                    "\"" + "Calculus" + "\"")
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                executeParameter += (curr_class_id + ',')
            else:
                executeParameter += (values + ',')
        executeParameter = executeParameter[:-1] + ")"
        executeString += executeParameter
        cursor.execute(executeString)

        # return back the data to populate the table

        cursor.execute("SELECT * FROM students")
        response = {
            'data': [{
                'student_id': student_id,
                'class_id': class_id,
                'student_name': student_name,
                'student_address': student_address,
                'student_email': student_email,
                'student_gpa': student_gpa
            } for (student_id, class_id, student_name, student_address, student_email, student_gpa) in cursor.fetchall()]
        }
        return response


@app.route('/staff', methods=['POST', 'GET'])
@cross_origin()
def get_staff():
    '''
    returns all staff in the database
    '''
    if request.method == 'GET':
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM staff")

        response = {
            'data': [{
                'staff_id': staff_id,
                'staff_name': staff_name,
                'staff_address': staff_address,
                'staff_phone_number': staff_phone_number,
                'staff_email': staff_email,
            } for (staff_id, staff_name, staff_address, staff_phone_number, staff_email) in cursor.fetchall()]
        }

        return response

    else:
        '''
        post request, create a new student
        '''
        executeString = "INSERT INTO staff (staff_name,staff_address,staff_phone_number,staff_email) VALUES"
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeParameter = "("
        for key, values in args.items():
            executeParameter += (values + ',')
        executeParameter = executeParameter[:-1] + ")"
        executeString += executeParameter
        cursor.execute(executeString)

        # return back the data to populate the table
        cursor.execute("SELECT * FROM staff")
        response = {
            'data': [{
                'staff_id': staff_id,
                'staff_name': staff_name,
                'staff_address': staff_address,
                'staff_phone_number': staff_phone_number,
                'staff_email': staff_email,
            } for (staff_id, staff_name, staff_address, staff_phone_number, staff_email) in cursor.fetchall()]
        }

        return response


@app.route('/classes', methods=['POST', 'GET'])
@cross_origin()
def get_classes():
    '''
    returns all classes in the database
    '''
    if request.method == 'GET':
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM classes")

        response = {
            'data': [{
                'class_id': class_id,
                'location_id': location_id,
                'student_id': student_id,
                'staff_id': staff_id,
                'class_name': class_name,
                'class_capacity': class_capacity,
                'class_num_enrolled': class_num_enrolled,
            } for (class_id, location_id, student_id, staff_id, class_name, class_capacity, class_num_enrolled) in cursor.fetchall()]
        }

        return response

    else:
        '''
        post request, create a new student
        '''
        executeString = "INSERT INTO classes (location_id,student_id,staff_id,class_name,class_capacity,class_num_enrolled) VALUES"
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeParameter = "("
        for key, values in args.items():
            if "gpa" in key:
                executeParameter += (values + ',')
            elif "location_id" in key:
                # default into every student with calculus
                class_id_execute_string = "(SELECT location_id FROM locations WHERE location_id = {})".format(
                    values)
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                executeParameter += (curr_class_id + ',')
            elif "student_id" in key:
                # default into every student with calculus
                class_id_execute_string = "(SELECT student_id FROM students WHERE student_id = {})".format(
                    values)
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                executeParameter += (curr_class_id + ',')
            elif "class_id" in key:
                # default into every student with calculus
                class_id_execute_string = "(SELECT class_id FROM classes WHERE class_id = {})".format(
                    values)
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                executeParameter += (curr_class_id + ',')
            else:
                executeParameter += (values + ',')
        executeParameter = executeParameter[:-1] + ")"
        executeString += executeParameter
        cursor.execute(executeString)

        # return back the data to populate the table
        cursor.execute("SELECT * FROM classes")

        response = {
            'data': [{
                'class_id': class_id,
                'location_id': location_id,
                'student_id': student_id,
                'staff_id': staff_id,
                'class_name': class_name,
                'class_capacity': class_capacity,
                'class_num_enrolled': class_num_enrolled,
            } for (class_id, location_id, student_id, staff_id, class_name, class_capacity, class_num_enrolled) in cursor.fetchall()]
        }

        return response


@app.route('/locations', methods=['POST', 'GET'])
@cross_origin()
def get_locations():
    '''
    returns all locations in the database
    '''
    if request.method == 'GET':
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM locations")

        response = {
            'data': [{
                'location_id': location_id,
                'class_id': class_id,
                'location_num_of_seats': location_num_of_seats,
                'location_accessibility': location_accessibility,
                'location_building': location_building,
            } for (location_id, class_id, location_num_of_seats, location_accessibility, location_building) in cursor.fetchall()]
        }

        return response

    else:
        '''
        post request, create a new student
        '''
        executeString = "INSERT INTO locations (class_id,location_num_of_seats,location_accessibility,location_building) VALUES "
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeParameter = "("
        for key, values in args.items():
            if "class_id" in key:
                # default into every student with calculus
                class_id_execute_string = "(SELECT class_id FROM classes WHERE class_id = {})".format(
                    values)
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                executeParameter += (curr_class_id + ',')
            else:
                # default into every student with calculus
                executeParameter += (values + ',')
        executeParameter = executeParameter[:-1] + ")"
        executeString += executeParameter
        cursor.execute(executeString)

        # return back the data to populate the table
        cursor.execute("SELECT * FROM locations")

        response = {
            'data': [{
                'location_id': location_id,
                'class_id': class_id,
                'location_num_of_seats': location_num_of_seats,
                'location_accessibility': location_accessibility,
                'location_building': location_building,
            } for (location_id, class_id, location_num_of_seats, location_accessibility, location_building) in cursor.fetchall()]
        }

        return response


@app.route('/enrolled_in', methods=['POST', 'GET'])
@cross_origin()
def get_enrolled_in():
    '''
    returns all classes a student is enrolled in
    '''
    if request.method == 'GET':
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM enrolled_in")

        response = {
            'data': [{
                'student_id': student_id,
                'class_id': class_id,
            } for (student_id, class_id) in cursor.fetchall()]
        }

        return response

    else:
        '''
        post request, create a new student
        '''
        executeString = "INSERT INTO enrolled_in (student_id,class_id) VALUES "
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeParameter = "("
        for key, values in args.items():
            if "student_id" in key:
                # default into every student with calculus
                class_id_execute_string = "(SELECT student_id FROM students WHERE student_id = {})".format(
                    values)
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                executeParameter += (curr_class_id + ',')
            if "class_id" in key:
                # default into every student with calculus
                class_id_execute_string = "(SELECT class_id FROM classes WHERE class_id = {})".format(
                    values)
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                executeParameter += (curr_class_id + ',')
        executeParameter = executeParameter[:-1] + ")"
        executeString += executeParameter
        cursor.execute(executeString)

        # return back the data to populate the table
        cursor.execute("SELECT * FROM enrolled_in")

        response = {
            'data': [{
                'student_id': student_id,
                'class_id': class_id,
            } for (student_id, class_id) in cursor.fetchall()]
        }
        return response


@app.route('/hosts', methods=['POST', 'GET'])
@cross_origin()
def get_hosts():
    '''
    returns all classes a staff is hosting
    '''
    if request.method == 'GET':
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM hosts")

        response = {
            'data': [{
                'location_id': location_id,
                'class_id': class_id,
            } for (location_id, class_id) in cursor.fetchall()]
        }

        return response

    else:
        '''
        post request, create a new student
        '''
        executeString = "INSERT INTO enrolled_in (student_id,class_id) VALUES "
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeParameter = "("
        for key, values in args.items():
            if "location_id" in key:
                # default into every student with calculus
                class_id_execute_string = "(SELECT location_id FROM locations WHERE location_id = {})".format(
                    values)
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                executeParameter += (curr_class_id + ',')
            if "class_id" in key:
                # default into every student with calculus
                class_id_execute_string = "(SELECT class_id FROM classes WHERE class_id = {})".format(
                    values)
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                executeParameter += (curr_class_id + ',')
        executeParameter = executeParameter[:-1] + ")"
        executeString += executeParameter
        cursor.execute(executeString)

        # return back the data to populate the table
        cursor.execute("SELECT * FROM enrolled_in")

        response = {
            'data': [{
                'student_id': student_id,
                'class_id': class_id,
            } for (student_id, class_id) in cursor.fetchall()]
        }
        return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6969, debug=True)
