import os
from flask import request
from flask_restx import Resource
from . import api_rest
import requests


@api_rest.route('/pollen')
class Weather(Resource):

    def post(self):
        zip = request.args.get('zip')
        print(f'zip server: {zip}')
        url = f"https://cs361-microservice.herokuapp.com/api?zip={zip}"
        response = requests.get(url)
        try:
            return response.json()  # Sometimes response is empty
        except:
            return 0
