from flask import Flask, render_template, send_from_directory, request, \
    jsonify, make_response
from flask_cors import CORS, cross_origin
import boto3
import os
import matplotlib.pyplot as plt
import settings
from decouple import config


def generate_pie():
    # Get the input data (Wedge is the distance between slices)
    # data = [60,40]
    # colors = ['#003049','#ffcdb2']
    # wedge = 0.05

    data = request.args.get('data')
    colors = request.args.get('colors')
    wedge = request.args.get('wedge')

    # Turn it into a list
    data = [float(i) for i in data.split(',')]
    colors = ['#' + i for i in colors.split(',')]

    # Make a matplotlib (high res) pie chart!
    fig1, ax1 = plt.subplots(figsize=(20,20))
    patches, texts = ax1.pie(data,explode=[float(wedge) for w in range(0,len(data))], colors = colors, startangle=90)

    # Equal aspect ratio ensures that pie is drawn as a circle
    ax1.axis('equal')
    plt.tight_layout()

    # Save the image temporary on the local machine
    # plt.savefig(os.getcwd() + '/test.png')

    # status = {};
    # status['status'] = 'DONE';
    # return make_response(jsonify(status), 200)

    # Save the image temporary on the local machine
    plt.savefig(os.getcwd() + '/test.png')
    print(f'access key: {settings.ACCESS_KEY}')

    # Connect to the S3 bucket and just drop it on there
    s3 = boto3.client('s3', aws_access_key_id=config('ACCESS_KEY'), aws_secret_access_key=config('SECRET_KEY'))
    s3.upload_file(os.getcwd() + '/test.png', config('BUCKET'), 'test.png', ExtraArgs={'ACL': 'public-read'})  # The return will be a json where message

    # contains the image path (URL)
    status = {};
    status['status'] = 'DONE';
    status['message'] = 'https://' + settings.BUCKET + '.s3.us-west-1.amazonaws.com/test.png'
    return make_response(jsonify(status), 200)