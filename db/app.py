import MySQLdb
from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
import configparser

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
config_info = read_mysql_config("./db_login_serm.js")
db_connection = connect_to_database(config_info)


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