# from .resources import *
import os
from flask import request
from flask_restx import Resource
from . import api_rest
import requests


@api_rest.route('/weather')
class Weather(Resource):

    def post(self):
        OPENWEATHER_KEY = os.getenv('REACT_APP_OPENWEATHER_KEY')
        req = request.json
        value = req['value']
        zip = req['zip']
        query_type = 'q'
        if req['zip']:
            query_type = 'zip'
        print(f'value: {value}')
        url = f"http://api.openweathermap.org/data/2.5/weather?{query_type}={value}&appid={OPENWEATHER_KEY}&units=metric"
        response = requests.get(url)
        return response.json()
