"""
REST API Resource Routing
http://flask-restplus.readthedocs.io
"""

import os
from datetime import datetime
from flask import request
from flask_restx import Resource

# from .security import require_auth
from . import api_rest

import psycopg2
from psycopg2.extras import NamedTupleCursor, DictCursor
from collections import namedtuple
import json

#Database initialization
# DATABASE_URL = os.getenv("DATABASE_URL")
# conn = psycopg2.connect(DATABASE_URL)
# cur = conn.cursor()

# class SecureResource(Resource):
#     """ Calls require_auth decorator on all requests """
#     method_decorators = [require_auth]


# Method to turn a response into a dictionary
def create_record(obj, fields):
    return dict(zip(fields, obj))


# Connect to DB
def get_connection():
    # return psycopg2.connect("dbname=wonderboard")
    DATABASE_URL = os.getenv('DATABASE_URL')
    return psycopg2.connect(DATABASE_URL)


# Find all rows in a table
def find_all(table):
    conn = get_connection()

    with conn.cursor() as cur:
        cur.execute(f"SELECT * FROM {table} ORDER BY id;")
        conn.commit()
        rows = cur.fetchall()
        column_names = [desc[0] for desc in cur.description]

    data = []
    for row in rows:
        data.append(create_record(row, column_names))

    return data


# Find one item in a table by id
def find_one(table, id):
    conn = get_connection()

    with conn.cursor() as cur:
        cur.execute(f"SELECT * FROM {table} where id={id};")
        conn.commit()
        row = cur.fetchone()
        column_names = [desc[0] for desc in cur.description]

    return create_record(row, column_names)


# Delete one item in a table by id
def delete_one(table, id):
    conn = get_connection()
    query = f"DELETE FROM {table} WHERE id={id};"
    query_params = (id,)

    with conn.cursor() as cur:
        cur.execute(query, query_params)
        conn.commit()
        result = cur

    return f"{result.rowcount} row deleted"


# Query function from class materials
def execute_query(db_connection = None, query = None, query_params = ()):
    '''
    executes a given SQL query on the given db connection and returns a Cursor object

    db_connection: a MySQLdb connection object created by connect_to_database()
    query: string containing SQL query

    returns: A Cursor object as specified at https://www.python.org/dev/peps/pep-0249/#cursor-objects.
    You need to run .fetchall() or .fetchone() on that object to actually acccess the results.

    '''

    if db_connection is None:
        print("No connection to the database found! Have you called connect_to_database() first?")
        return None

    if query is None or len(query.strip()) == 0:
        print("query is empty! Please pass a SQL query in query")
        return None

    print("Executing %s with %s" % (query, query_params))
    # Create a cursor to execute query. Why? Because apparently they optimize execution by retaining a reference according to PEP0249
    # Argument 'mariadb.cursors.DictCursor' will include dict keys in response SOURCE: Piazza @40
    cursor = db_connection.cursor(mariadb.cursors.DictCursor)

    '''
    params = tuple()
    #create a tuple of paramters to send with the query
    for q in query_params:
        params = params + (q)
    '''
    #TODO: Sanitize the query before executing it!!!
    cursor.execute(query, query_params)
    # this will actually commit any changes to the database. without this no
    # changes will be committed!
    db_connection.commit()
    return cursor
