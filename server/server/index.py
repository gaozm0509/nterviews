from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


class Config(object):
    SQLALCHEMY_DATABASE_URI = 'mysql://root:root_password@127.0.0.1:3306/interview'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TESTING = True


app.config.from_object(Config)

db = SQLAlchemy(app=app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'gender': self.gender
        }


def format_response(data, message='success', code=0):
    return jsonify({'data': data, 'message': message, 'code': code})


class HttpException_500(Exception):
    pass


@app.errorhandler(HttpException_500)
def handle_500(e):
    response = {
        'message': 'Internal Server Error',
        'details': str(e)
    }
    return jsonify(response), 500


# create user
@app.route('/api/create_user', methods=['POST'])
def create_user():
    try:
        # TODO: need check request data
        data = request.get_json()
        user = User(name=data['name'], gender=data['gender'])
        db.session.add(user)
        db.session.commit()
        return format_response(user.to_dict())

    except Exception as e:
        raise HttpException_500(e)


# get user list
@app.route('/api/get_user_list', methods=['GET'])
def get_user_list():
    try:
        users = User.query.all()
        return format_response([user.to_dict() for user in users])

    except Exception as e:
        raise HttpException_500(e)


# edit user
@app.route('/api/edit_user', methods=['PUT'])
def edit_user():
    try:
        # TODO: need check request data
        data = request.get_json()
        user = User.query.filter_by(id=data['id']).first()
        if user is None:
            raise format_response({}, 'user not found', 1)
        user.name = data['name']
        user.gender = data['gender']
        db.session.commit()
        return format_response(user.to_dict())

    except Exception as e:
        raise HttpException_500(e)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='api.localhost.com', port=8000, debug=True)
