import os
from datetime import datetime
from flask import request
from flask_restx import Resource
from . import api_rest
import requests
from bs4 import BeautifulSoup


@api_rest.route('/stocks/<string:resource_id>')
class Stock(Resource):

    # Find task
    def get(self, resource_id):
        symbol = resource_id.upper()
        URL = f"https://finance.yahoo.com/quote/{symbol}?p={symbol}"
        page = requests.get(URL)

        # Parse page
        soup = BeautifulSoup(page.content, "html.parser")

        # find element with the given classes (based on page inspection)
        # Modification to work with finance.yahoo.com site as of 11/12/22
        price = soup.find("fin-streamer", class_="Fw(b) Fz(36px) Mb(-4px) D(ib)")

        # return text within tag
        return price.text, 200
