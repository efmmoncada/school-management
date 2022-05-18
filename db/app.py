import MySQLdb
from flask import Flask, request, render_template
from flask_cors import CORS
import configparser


def read_mysql_config(mysql_config_file_name: str):
    config = configparser.ConfigParser()
    config.read(mysql_config_file_name)
    return dict(config['client'])

def connect_to_database(config_info):
    '''
    connects to a database and returns a database objects
    '''
    db_conn = MySQLdb.connect(config_info['host'],
                          config_info['user'],
                          config_info['password'],
                          config_info['database'])
    return db_conn





# just in case we have CORS issues
app = Flask(__name__)
cors = CORS(app)

config_info = read_mysql_config("./db_login_serm.js")
db_conn = connect_to_database(config_info)




@app.route('/getTables', methods=["GET"])
def get_all_tables():
    res_html = "<html>\n<body>\n<table border=\"1\">\n"
    cursor = db_conn.cursor()
    cursor.execute('show tables;', ())
    for [table_name] in cursor.fetchall():
        res_html += f"<tr><td>{table_name}</td></tr>\n"
    res_html += "</table>\n"
    res_html += "<img src=\"/static/logo.png\" />\n</body>\n</html>\n"
    return res_html


# @webapp.route('/')
# def get_tables():
#     res_html = "<html>\n<body>\n<table border=\"1\">\n"
#     cursor = db_conn.cursor()
#     cursor.execute('show tables;', ())
#     for [table_name] in cursor.fetchall():
#         res_html += f"<tr><td>{table_name}</td></tr>\n"
#     res_html += "</table>\n"
#     res_html += "<img src=\"/static/logo.png\" />\n</body>\n</html>\n"
#     return res_html


# if __name__ == '__main__':
#     print("Executing a sample query on the database using the credentials from db_login_[onid].py")
#     # rename the db_login_[onid] or comment out :)
#     config_info = read_mysql_config("./db_login_serm.js")
#     db = connect_to_database(config_info)

# webapp = flask.Flask(__name__, static_url_path='/static')