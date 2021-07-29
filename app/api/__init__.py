""" API Blueprint Application """

from flask import Blueprint, current_app
from flask_restx import Api

api_bp = Blueprint('api_bp', __name__, url_prefix='/api')
api_rest = Api(api_bp)


@api_bp.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    return response

# Add individual route modules here
# from .users import *
# from .boards import *
# from .lists import *
# from .tasks import *
# from .board_users import *
# from .task_users import *
from .stocks import *

# Import resources to ensure view is registered
# from .resources import * # NOQA
