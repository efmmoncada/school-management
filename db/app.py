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
                          config_info['database'])
    return db_connection

# just in case we have CORS issues
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# replace with your own login credentials file 
config_info = read_mysql_config(os.environ.get("DB_AUTH_FILE"))
db_connection = connect_to_database(config_info)


@app.route('/students', methods=['GET'])
@cross_origin()
def get_students():
    '''
    returns all students in the database
    '''
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


@app.route('/staff', methods=['GET'])
@cross_origin()
def get_staff():
    '''
    returns all staff in the database
    '''
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


@app.route('/classes', methods=['GET'])
@cross_origin()
def get_classes():
    '''
    returns all classes in the database
    '''
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


@app.route('/locations', methods=['GET'])
@cross_origin()
def get_locations():
    '''
    returns all locations in the database
    '''
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


@app.route('/enrolled_in', methods=['GET'])
@cross_origin()
def get_enrolled_in():
    '''
    returns all classes a student is enrolled in
    '''
    cursor = db_connection.cursor()
    cursor.execute("SELECT * FROM enrolled_in")

    response = {
        'data': [{
            'student_id': student_id,
            'class_id': class_id,
        } for (student_id, class_id) in cursor.fetchall()]
    }

    return response


@app.route('/hosts', methods=['GET'])
@cross_origin()
def get_hosts():
    '''
    returns all classes a staff is hosting
    '''
    cursor = db_connection.cursor()
    cursor.execute("SELECT * FROM hosts")

    response = {
        'data': [{
            'location_id': location_id,
            'class_id': class_id,
        } for (location_id, class_id) in cursor.fetchall()]
    }

    return response


@app.route('/getTables', methods=["GET"])
@cross_origin()
def get_all_tables():
    res_html = "<html>\n<body>\n<table border=\"1\">\n"
    cursor = db_connection.cursor()
    cursor.execute('show tables;', ())
    for [table_name] in cursor.fetchall():
        res_html += f"<tr><td>{table_name}</td></tr>\n"
    res_html += "</table>\n"
    res_html += "<img src=\"/static/logo.png\" />\n</body>\n</html>\n"
    return res_html


if __name__ == '__main__':
    app.run(development=True)