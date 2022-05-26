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
cursor.execute("SET FOREIGN_KEY_CHECKS = 0")
cursor.connection.autocommit(True)


@app.route('/students', methods=['GET', 'PUT', 'DELETE', 'POST'])
@cross_origin()
def get_students():
    '''
    returns all students in the database
    '''
    if request.method == 'GET':
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM students;")
        # db_connection.commit();

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
        cursor.close()
        return response

    elif request.method == 'POST':
        '''
        POST request, create a new student
        '''
        executeString = "INSERT INTO students (class_id,student_name,student_address,student_email,student_gpa) VALUES"
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeParameter = "("
        executeEnrolledIn = "INSERT INTO enrolled_in (class_id,student_id) VALUES ("
        for key, values in args.items():
            if "class_id" in key:
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT class_id FROM classes WHERE class_id = {})".format(
                    formated_values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (curr_class_id + ',')
                executeEnrolledIn += (curr_class_id + ',')
            else:
                executeParameter += ( values + ',')
        executeParameter = executeParameter[:-1] + ");"
        executeString += executeParameter
        print(executeString)
        cursor = db_connection.cursor()
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        cursor.execute("SELECT LAST_INSERT_ID();")
        student_id_retrieved=(str(cursor.fetchone()[0]))
        cursor.close()
        # print("last insert id{}".format(student_id_retrieved))
        executeEnrolledIn+= (student_id_retrieved + ');')
        # create in enrolled

        cursor = db_connection.cursor()
        cursor.execute(executeEnrolledIn)
        cursor.close()
        # db_connection.commit();

        # return back the data to populate the table
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM students;")
        # db_connection.commit();
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
        cursor.close()
        return response

    elif request.method == 'PUT':
        '''
        edit an entry
        '''
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeString = "UPDATE students SET "
        executeParameter = ""
        executeParameterEnd = " WHERE "
        executeEnrolledIn = "UPDATE enrolled_in SET "
        for key, values in args.items():
            if "student_id" in key:
                formated_values = int(float(values[1:-1]))
                executeParameterEnd += (key + "=" + str(formated_values) + ';')
                executeEnrolledIn += (key + "=" + str(formated_values) + " WHERE " + key + "=" + str(formated_values) + ';')
            elif "class_id" in key:
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT class_id FROM classes WHERE class_id = {})".format(
                    formated_values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (key + "=" + values + ',')
                executeEnrolledIn += (key + "=" + str(formated_values) + ',')
            else:
                executeParameter += (key + "=" + values + ',')
        # remove the last comma and add WHERE
        executeParameter = executeParameter[:-1] + executeParameterEnd
        executeString += executeParameter
        print(executeString)
        cursor = db_connection.cursor()
        cursor.execute(executeString)
        cursor.close()
        print(executeEnrolledIn)
        cursor = db_connection.cursor()
        cursor.execute(executeEnrolledIn)
        cursor.close()
        # db_connection.commit();

        # return back the data to populate the table
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM students;")
        # db_connection.commit();
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
        cursor.close()
        return response

    elif request.method == 'DELETE':
        '''
        delete an entry
        '''
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeString = "DELETE from students"
        executeParameterEnd = " WHERE "
        executeEnrolledIn = "DELETE from enrolled_in WHERE "
        print(args)
        for key, values in args.items():
            if "student_id" in key:
                executeParameterEnd += (key + "=" + values + ';')
                executeEnrolledIn += (key + "=" + values + ' and ')
            if "class_id" in key:
                executeEnrolledIn += (key + "=" + values + ';')
        executeString += executeParameterEnd
        print(executeString)
        cursor.execute(executeString)
        cursor.close()

        cursor = db_connection.cursor()
        print(executeEnrolledIn)
        cursor.execute(executeEnrolledIn)
        cursor.close()

        # return back the data to populate the table
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM students;")
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

@app.route('/staff', methods=['GET', 'PUT', 'DELETE', 'POST'])
@cross_origin()
def get_staff():
    '''
    returns all staff in the database
    '''
    if request.method == 'GET':
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM staff;")
        # db_connection.commit();

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

    elif request.method == 'POST':
        '''
        post request, create a new student
        '''
        executeString = "INSERT INTO staff (staff_name,staff_address,staff_phone_number,staff_email) VALUES"
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeParameter = "("
        for key, values in args.items():
            executeParameter += (values + ',')
        executeParameter = executeParameter[:-1] + ");"
        executeString += executeParameter
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();

        # return back the data to populate the table
        cursor.execute("SELECT * FROM staff;")
        # db_connection.commit();
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

    elif request.method == 'PUT':
        '''
        edit an entry
        '''
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeString = "UPDATE staff SET "
        executeParameter = ""
        executeParameterEnd = " WHERE "
        for key, values in args.items():
            if "staff_id" in key:
                executeParameterEnd += (key + "=" + values + ';')
            else:
                executeParameter += (key + "=" + values + ',')
        # remove the last comma and add WHERE
        executeParameter = executeParameter[:-1] + executeParameterEnd
        executeString += executeParameter
        print(executeString)
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();

        # return back the data to populate the table
        cursor.execute("SELECT * FROM staff;")
        # db_connection.commit();
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

    elif request.method == 'DELETE':
        '''
        delete an entry
        '''
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeString = "DELETE from staff"
        executeParameterEnd = " WHERE "
        for key, values in args.items():
            if "staff_id" in key:
                executeParameterEnd += (key + "=" + values + ';')
        executeString += executeParameterEnd
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();

        # return back the data to populate the table
        cursor.execute("SELECT * FROM staff;")
        # db_connection.commit();
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


@app.route('/classes', methods=['GET', 'PUT', 'DELETE', 'POST'])
@cross_origin()
def get_classes():
    '''
    returns all classes in the database
    '''
    if request.method == 'GET':
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM classes;")
        # db_connection.commit();

        response = {
            'data': [{
                'class_id': class_id,
                'location_id': location_id,
                'staff_id': staff_id,
                'class_name': class_name,
                'class_capacity': class_capacity,
                'class_num_enrolled': class_num_enrolled,
            } for (class_id, location_id, staff_id, class_name, class_capacity, class_num_enrolled) in cursor.fetchall()]
        }

        return response

    elif request.method == 'POST':
        '''
        post request, create a new class
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
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT location_id FROM locations WHERE location_id = {})".format(
                    formated_values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (curr_class_id + ',')
            elif "student_id" in key:
                # default into every student with calculus
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT student_id FROM students WHERE student_id = {})".format(
                    formated_values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (curr_class_id + ',')
            elif "staff_id" in key:
                # default into every student with calculus
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT staff_id FROM staff WHERE staff_id = {})".format(
                    formated_values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (curr_class_id + ',')
            else:
                executeParameter += (values + ',')
        executeParameter = executeParameter[:-1] + ");"
        executeString += executeParameter
        cursor = db_connection.cursor()
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();

        # return back the data to populate the table
        cursor.execute("SELECT * FROM classes;")
        # db_connection.commit();

        response = {
            'data': [{
                'class_id': class_id,
                'location_id': location_id,
                'staff_id': staff_id,
                'class_name': class_name,
                'class_capacity': class_capacity,
                'class_num_enrolled': class_num_enrolled,
            } for (class_id, location_id, staff_id, class_name, class_capacity, class_num_enrolled) in cursor.fetchall()]
        }

        return response

    elif request.method == 'PUT':
        '''
        edit an entry
        '''
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeString = "UPDATE classes SET "
        executeParameter = ""
        executeParameterEnd = " WHERE "
        for key, values in args.items():
            if "class_id" in key:
                executeParameterEnd += (key + "=" + values + ';')
            elif "location_id" in key:
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT location_id FROM locations WHERE location_id={})".format(
                    formated_values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                print(curr_class_id)
                cursor.close()
                executeParameter += (key + "=" + str(formated_values) + ',')
            elif "student_id" in key:
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT student_id FROM students WHERE student_id={})".format(
                    formated_values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                print(curr_class_id)
                cursor.close()
                executeParameter += (key + "=" + str(formated_values) + ',')
            elif "staff_id" in key:
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT staff_id FROM staff WHERE staff_id={})".format(
                    formated_values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                print(curr_class_id)
                cursor.close()
                executeParameter += (key + "=" + str(formated_values) + ',')
            else:
                executeParameter += (key + "=" + values + ',')
        # remove the last comma and add WHERE
        executeParameter = executeParameter[:-1] + executeParameterEnd
        executeString += executeParameter
        print(executeString);
        cursor = db_connection.cursor()
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();

        # return back the data to populate the table
        cursor.execute("SELECT * FROM classes;")
        # db_connection.commit();

        response = {
            'data': [{
                'class_id': class_id,
                'location_id': location_id,
                'staff_id': staff_id,
                'class_name': class_name,
                'class_capacity': class_capacity,
                'class_num_enrolled': class_num_enrolled,
            } for (class_id, location_id, staff_id, class_name, class_capacity, class_num_enrolled) in cursor.fetchall()]
        }

        return response

    elif request.method == 'DELETE':
        '''
        delete an entry
        '''
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeString = "DELETE from classes"
        executeParameterEnd = " WHERE "
        for key, values in args.items():
            if "class_id" in key:
                executeParameterEnd += (key + "=" + values + ';')
        executeString += executeParameterEnd
        print(executeString)
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();

        # return back the data to populate the table
        cursor.execute("SELECT * FROM classes;")
        # db_connection.commit();

        response = {
            'data': [{
                'class_id': class_id,
                'location_id': location_id,
                'staff_id': staff_id,
                'class_name': class_name,
                'class_capacity': class_capacity,
                'class_num_enrolled': class_num_enrolled,
            } for (class_id, location_id, staff_id, class_name, class_capacity, class_num_enrolled) in cursor.fetchall()]
        }

        return response


@app.route('/locations', methods=['GET', 'PUT', 'DELETE', 'POST'])
@cross_origin()
def get_locations():
    '''
    returns all locations in the database
    '''
    if request.method == 'GET':
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM locations;")
        # db_connection.commit();

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

    elif request.method == 'POST':
        '''
        post request, create a new student
        '''
        executeString = "INSERT INTO locations (class_id,location_num_of_seats,location_accessibility,location_building) VALUES "
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeParameter = "("
        for key, values in args.items():
            if "isAccessible" in key:
                print(values.replace('"',""))
                executeParameter += (values.replace('"',"") + ',')
            elif "class_id" in key:
                # default into every student with calculus
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT class_id FROM classes WHERE class_id = {})".format(
                    formated_values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (curr_class_id + ',')
            else:
                executeParameter += (values + ',')
        executeParameter = executeParameter[:-1] + ");"
        executeString += executeParameter
        print(executeString)
        cursor = db_connection.cursor()
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()

        # return back the data to populate the table
        cursor.execute("SELECT * FROM locations;")
        # db_connection.commit();
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

    elif request.method == 'PUT':
        '''
        edit an entry
        '''
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeString = "UPDATE locations SET "
        executeParameter = ""
        executeParameterEnd = " WHERE "
        for key, values in args.items():
            if "location_id" in key:
                executeParameterEnd += (key + "=" + values + ';')
            else:
                executeParameter += (key + "=" + values + ',')
        # remove the last comma and add WHERE
        executeParameter = executeParameter[:-1] + " " + executeParameterEnd
        executeString += " " + executeParameter
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();

        # return back the data to populate the table
        cursor.execute("SELECT * FROM locations;")
        # db_connection.commit();
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

    elif request.method == 'DELETE':
        '''
        delete an entry
        '''
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeString = "DELETE from locations"
        executeParameterEnd = " WHERE "
        for key, values in args.items():
            if "location_id" in key:
                executeParameterEnd += (key + "=" + values + ';')
        executeString += executeParameterEnd
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();
        # return back the data to populate the table
        cursor.execute("SELECT * FROM locations;")
        # db_connection.commit();
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


@app.route('/enrolled_in', methods=['GET', 'PUT', 'DELETE', 'POST'])
@cross_origin()
def get_enrolled_in():
    '''
    returns all classes a student is enrolled in
    '''
    if request.method == 'GET':
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM enrolled_in;")
        # db_connection.commit();
        response = {
            'data': [{
                'student_id': student_id,
                'class_id': class_id,
            } for (student_id, class_id) in cursor.fetchall()]
        }

        return response

    elif request.method == 'POST':
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
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT student_id FROM students WHERE student_id = {})".format(
                    formated_values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (curr_class_id + ',')
            elif "class_id" in key:
                # default into every student with calculus
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT class_id FROM classes WHERE class_id = {})".format(
                    formated_values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (curr_class_id + ',')
            else:
                executeParameter += (values + ',')
        executeParameter = executeParameter[:-1] + ");"
        executeString += executeParameter
        cursor = db_connection.cursor()
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();

        # return back the data to populate the table
        cursor.execute("SELECT * FROM enrolled_in;")
        # db_connection.commit();
        response = {
            'data': [{
                'student_id': student_id,
                'class_id': class_id,
            } for (student_id, class_id) in cursor.fetchall()]
        }
        return response

    elif request.method == 'PUT':
        '''
        edit an entry
        '''
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        print(args)
        executeString = "UPDATE enrolled_in SET "
        executeParameter = ""
        executeParameterEnd = " WHERE "
        for key, values in args.items():
            if "student_id" == key:
                # default into every student with calculus
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT student_id FROM students WHERE student_id = {})".format(
                    values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (key + "=" + curr_class_id + ',')
            elif "class_id" == key:
                # default into every student with calculus
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT class_id FROM classes WHERE class_id = {})".format(
                    values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (key + "=" + curr_class_id + ',')
            elif "previous_student_id" == key:
                # default into every student with calculus
                executeParameterEnd += (key[9:] + "=" + values + ';')
            elif "previous_class_id" == key:
                # default into every student with calculus
                executeParameterEnd += (key[9:] + "=" + values + ' and ')
        # remove the last comma and add WHERE
        executeParameter = executeParameter[:-1] + executeParameterEnd
        executeString += executeParameter
        print(executeString)
        cursor = db_connection.cursor()
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();
        # return back the data to populate the table
        cursor.execute("SELECT * FROM enrolled_in;")
        # db_connection.commit();
        response = {
            'data': [{
                'student_id': student_id,
                'class_id': class_id,
            } for (student_id, class_id) in cursor.fetchall()]
        }

        return response

    elif request.method == 'DELETE':
        '''
        delete an entry
        '''
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeString = "DELETE from enrolled_in"
        executeParameter = " WHERE "
        executeParameterEnd = ""
        for key, values in args.items():
            if "class_id" in key:
                executeParameterEnd += (key + "=" + values + ';')
            else:
                executeParameter += (key + "=" + values + ' and ')
        executeString += executeParameter + executeParameterEnd
        print(executeString)
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();
        # return back the data to populate the table
        cursor.execute("SELECT * FROM enrolled_in;")
        # db_connection.commit();
        response = {
            'data': [{
                'student_id': student_id,
                'class_id': class_id,
            } for (student_id, class_id) in cursor.fetchall()]
        }

        return response



@app.route('/hosts', methods=['GET', 'PUT', 'DELETE', 'POST'])
@cross_origin()
def get_hosts():
    '''
    returns all classes a staff is hosting
    '''
    if request.method == 'GET':
        cursor = db_connection.cursor()
        cursor.execute("SELECT * FROM hosts;")
        # db_connection.commit();
        response = {
            'data': [{
                'location_id': location_id,
                'class_id': class_id,
            } for (location_id, class_id) in cursor.fetchall()]
        }

        return response

    elif request.method == 'POST':
        '''
        post request, create a new student
        '''
        executeString = "INSERT INTO hosts (location_id,class_id) VALUES "
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeParameter = "("
        for key, values in args.items():
            if "location_id" in key:
                # default into every student with calculus
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT location_id FROM locations WHERE location_id = {})".format(
                    formated_values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (curr_class_id + ',')
            elif "class_id" in key:
                # default into every student with calculus
                formated_values = int(float(values[1:-1]))
                print(formated_values)
                class_id_execute_string = "(SELECT class_id FROM classes WHERE class_id = {})".format(
                    formated_values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (curr_class_id + ',')
            else:
                executeParameter += (values + ',')
        executeParameter = executeParameter[:-1] + ");"
        executeString += executeParameter
        print(executeString)
        cursor = db_connection.cursor()
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();
        # return back the data to populate the table
        cursor.execute("SELECT * FROM hosts;")
        # db_connection.commit();
        response = {
            'data': [{
                'location_id': student_id,
                'class_id': class_id,
            } for (student_id, class_id) in cursor.fetchall()]
        }
        return response

    elif request.method == 'PUT':
        '''
        edit an entry
        '''
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeString = "UPDATE hosts SET "
        executeParameter = ""
        executeParameterEnd = " WHERE "
        for key, values in args.items():
            if "location_id" == key:
                # default into every student with calculus
                # formated_values = int(float(values[1:-1]))
                # print(formated_values)
                class_id_execute_string = "(SELECT location_id FROM locations WHERE location_id = {})".format(
                    values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (key + "=" + curr_class_id + ',')
            elif "class_id" == key:
                # default into every student with calculus
                # formated_values = int(float(values[1:-1]))
                # print(formated_values)
                class_id_execute_string = "(SELECT class_id FROM classes WHERE class_id = {})".format(
                    values)
                cursor = db_connection.cursor()
                cursor.execute(class_id_execute_string)
                curr_class_id = str(cursor.fetchone()[0])
                cursor.close()
                executeParameter += (key + "=" + curr_class_id + ',')
            elif "previous_location_id" == key:
                # default into every student with calculus
                executeParameterEnd += (key[9:] + "=" + values + ';')
            elif "previous_class_id" == key:
                # default into every student with calculus
                executeParameterEnd += (key[9:] + "=" + values + ' and ')
        # remove the last comma and add WHERE
        executeParameter = executeParameter[:-1] + executeParameterEnd
        executeString += executeParameter
        print(executeString)
        cursor = db_connection.cursor()
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();
        # return back the data to populate the table
        cursor.execute("SELECT * FROM hosts;")
        # db_connection.commit();
        response = {
            'data': [{
                'location_id': location_id,
                'class_id': class_id,
            } for (location_id, class_id) in cursor.fetchall()]
        }

        return response

    elif request.method == 'DELETE':
        '''
        delete an entry
        '''
        cursor = db_connection.cursor()
        args = (request.args).to_dict()
        executeString = "DELETE from hosts"
        executeParameter = " WHERE "
        executeParameterEnd = ""
        for key, values in args.items():
            if "class_id" in key:
                executeParameterEnd += (key + "=" + values + ';')
            else:
                executeParameter += (key + "=" + values + ' and ')
        executeString += executeParameter + executeParameterEnd
        print(executeString)
        cursor.execute(executeString)
        cursor.close()
        cursor = db_connection.cursor()
        # db_connection.commit();
        # return back the data to populate the table
        cursor.execute("SELECT * FROM hosts;")
        # db_connection.commit();
        response = {
            'data': [{
                'location_id': location_id,
                'class_id': class_id,
            } for (location_id, class_id) in cursor.fetchall()]
        }

        return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6969, debug=True)
