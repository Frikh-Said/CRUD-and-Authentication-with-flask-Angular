import bcrypt
from flask import jsonify
from flask import Flask, request  , jsonify
import myCar as car
import myUser as user
from flask_cors import CORS, cross_origin
import mysql.connector
# import jwt
# import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
jwt=JWTManager(app)
cors = CORS(app)

app.config['SECRET_KEY']= 'lsi2023'
mydb = mysql.connector.connect(
            host="127.0.0.1",
            user="root",
            password="",
            database="crudcar"
        )
######################################################
######################################################

@app.route('/savecar' , methods = ['POST'])
@jwt_required()
def saveCar():
    args = request.json
    id_car = args.get('id')
    model = args.get('model')
    hp = args.get('hp')
    marque = args.get('marque')
    user_id = get_jwt_identity()

    myCursor = mydb.cursor()

    mycar = car.Car(0 , model ,hp , marque ,user_id)
    req = "insert into car (model , hp , marque ,user_id) values (%s , %s , %s , %s)"
    val = (mycar.model , mycar.hp , mycar.marque ,mycar.user_id)
    myCursor.execute(req , val)
    mydb.commit()
    response=jsonify('Car Added successfully!')
    response.status_code=200  
    return response

######################################################
@app.route('/cars')
# @jwt_required()
def cars():

    mylist=[]
    user_id = 0
    myCursor = mydb.cursor()
    # myCursor.execute("SELECT model , hp , marque FROM car WHERE user_id=%s",(user_id,))
    myCursor.execute("SELECT id_car ,model , hp , marque FROM car")
    carRows = myCursor.fetchall()
    for x in carRows:
        mylist.append(car.Car(x[0],x[1],x[2],x[3],user_id).__dict__)
    response = jsonify(mylist)
    response.status_code = 200
    return response

######################################################
@app.route('/detailcar/<car_id>')
@jwt_required()
def detailCar(car_id):
    try:
        user_id = get_jwt_identity()
        myCursor = mydb.cursor()
        req="SELECT model , hp , marque FROM car WHERE id_car=%s and user_id=%s"
        val=(car_id,user_id)
        myCursor.execute(req,val)
        myresult=myCursor.fetchone()
        response=jsonify(myresult)
        response.status_code=200
        return response
    except Exception as e:
        print(e)

######################################################

@app.route('/deletecar/<id>' , methods = ['DELETE'])
@jwt_required()
def deleteCar(id):
    try:
        user_id = get_jwt_identity()
        myCursor = mydb.cursor()

        myCursor.execute("DELETE FROM  car WHERE id_car=%s and user_id=%s", (id,user_id))
        mydb.commit()
        response=jsonify('Car deleted successfully!')
        response.status_code=200  
        return response
    except Exception as e:
        print(e)

######################################################
@app.route('/updatecar/<id>' , methods = ['PUT'])
@jwt_required()
def updateCar(id):
    args = request.json
    model = args['model']
    hp = args['hp']
    marque = args['marque']
    user_id = get_jwt_identity()
    if model and hp and marque and request.method=='PUT':
        myCursor = mydb.cursor()
        mycar = car.Car(0 , model ,hp , marque , user_id)
        req = "UPDATE car SET model=%s, hp=%s, marque=%s WHERE id_car=%s and user_id=%s"
        val = (mycar.model, mycar.hp, mycar.marque, id, user_id,)
        myCursor.execute(req, val)
        mydb.commit()
        response = jsonify('Car updated successfully!')
        response.status_code=200
        return response
    else:
        return 'error'
######################################################
@app.route('/registre', methods=['POST'])
def registre():
    try:
        args = request.json
        id_user = args.get('id')
        username = args.get('username')
        password = args.get('password')
        myCursor = mydb.cursor()

        # Adding the salt to password
        salt = bcrypt.gensalt()
        # Hashing the password
        password = bcrypt.hashpw(password.encode('utf8'), salt)

        myuser = user.User(0, username, password)
        req = "insert into user (username, password) values (%s, %s)"
        val = (myuser.username, myuser.password)
        myCursor.execute(req, val)
        
        mydb.commit()
        response = jsonify('User Added successfully!')
        response.status_code = 200
        return response
    except Exception as e:
        print(e)

######################################################
@app.route('/login',methods=['POST'])
def login():
    args = request.json
    if not args:
        return {
            "message": "Please provide user details",
            "data": None,
             "error": "Bad request"
        }, 400
    username = args.get('username')
    password = args.get('password')
    myCursor = mydb.cursor()

    myCursor.execute("SELECT * FROM user WHERE username=%s",(username,))
    myresult=myCursor.fetchone()

    if bcrypt.checkpw(password.encode('utf8'),myresult[2].encode('utf8')):
        access_token = create_access_token(identity=myresult[0])
        return jsonify(access_token=access_token)
    else :
         return "username or password invalid"


if __name__ == '__main__':
   app.run(host="0.0.0.0", port="5000", debug=True)