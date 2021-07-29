# from .resources import *
import os
from datetime import datetime
from flask import request
from flask_restx import Resource
from . import api_rest
import requests
from bs4 import BeautifulSoup


# @api_rest.route('/stocks')
# class Stocks(Resource):
#
#     # Find all tasks
#     def get(self):
#         return find_all('tasks'), 200
#
#     # Insert task
#     def post(self):
#         data = request.json
#         conn = get_connection()
#         with conn.cursor() as cursor:
#             cursor.execute(f"""INSERT INTO tasks
#                            (list, name, description, creator)
#                            VALUES ('{data['list']}',
#                            '{data['name']}',
#                            '{data['description']}',
#                            '{data['creator']}')
#                            RETURNING id;""")
#             conn.commit()
#             id = cursor.fetchone()[0]
#             result = find_one('tasks', id)
#
#         return result, 201

@api_rest.route('/stocks/<string:resource_id>')
class Stock(Resource):

    # Find task
    def get(self, resource_id):
    # symbol = "TWST"
        symbol = resource_id.upper()
        URL = f"https://finance.yahoo.com/quote/{symbol}?p={symbol}"
        page = requests.get(URL)

        # Parse page
        soup = BeautifulSoup(page.content, "html.parser")

        # find element with the given classes (based on page inspection)
        price = soup.find("span", class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")

        # return text within tag
#         print(price.text)
        return price.text, 200

#     # Delete task
#     def delete(self, resource_id):
#         return delete_one('tasks', resource_id)
#
#     # Update task
#     def put(self, resource_id):
#         data = request.json
#         return update_one_task('tasks', data, resource_id)
#
#
# # Update task
# def update_one_task(table, data, id):
#     # Check for NULL value for Creator
#     if(data['creator'] == None):
#         data['creator'] = 'NULL'
#
#     conn = get_connection()
#     query = (f"""UPDATE {table}
#             SET list = {data['list']},
#             name = '{data['name']}',
#             description = '{data['description']}',
#             creator = {data['creator']}
#             WHERE id={id};""")
#
#     with conn.cursor() as cur:
#         cur.execute(query)
#         conn.commit()
#         result = find_one('tasks', id)
#
#     return result, 201
