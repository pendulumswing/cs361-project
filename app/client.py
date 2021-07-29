""" Client App """

import os
from flask import Blueprint, render_template

client_bp = Blueprint('client_app', __name__,
                      url_prefix='',
                      static_url_path='',s
                      static_folder='./build/static/',
                      template_folder='./build/',
                      )
