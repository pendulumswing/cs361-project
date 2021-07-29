from flask import Flask, render_template, send_from_directory, request, \
    jsonify, make_response
from flask_cors import CORS, cross_origin
import boto3
import os
import charts

app = Flask(__name__, static_folder='client/build', static_url_path='')
app.config.from_pyfile('settings.py')
cors = CORS(app)


@app.route('/api')
@cross_origin()
def welcome():
    return "Welcome to the API!!!"


@app.route('/api/justpie/')
@cross_origin()
def make_pie():
    return charts.generate_pie()
    # print('hello')


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
