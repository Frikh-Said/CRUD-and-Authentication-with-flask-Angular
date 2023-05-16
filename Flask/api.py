import pymysql
from flask import jsonify
from flask import Flask, request  , jsonify
import myCar as car
import json
from flask_cors import CORS, cross_origin
import mysql.connector


app = Flask(__name__)
cors = CORS(app)

mydb = mysql.connector.connect(
            host="127.0.0.1",
            user="root",
            password="",
            database="crudcar"
        )

@app.route('/savecar' , methods = ['POST'])
def saveCar():
    try:
        args = request.json
        id_car = args.get('id')
        model = args.get('model')
        hp = args.get('hp')
        marque = args.get('marque')

        myCursor = mydb.cursor()

        mycar = car.Car(0 , model ,hp , marque )
        req = "insert into car (model , hp , marque ) values (%s , %s , %s)"
        val = (mycar.model , mycar.hp , mycar.marque)
        myCursor.execute(req , val)
        mydb.commit()
        response=jsonify('Car Added successfully!')
        response.status_code=200  
        return response
    except Exception as e:
        print(e)

@app.route('/cars')
def emp():
    try:
        myCursor = mydb.cursor()
        req="SELECT * FROM car"
        myCursor.execute(req)
        carRows = myCursor.fetchall()
        respone = jsonify(carRows)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)

###########################
@app.route('/detailcar/<car_id>')
def detailCar(car_id):
    try:
        myCursor = mydb.cursor()
    
        myCursor.execute("SELECT * FROM car WHERE id_car=%s",(car_id,))
        myresult=myCursor.fetchone()
        response=jsonify(myresult)
        response.status_code=200
        return response
    except Exception as e:
        print(e)

###########################

@app.route('/deletecar/<id>' , methods = ['DELETE'])
def deleteCar(id):
    try:
        myCursor = mydb.cursor()

        myCursor.execute("DELETE FROM  car WHERE id_car=%s", (id,))
        mydb.commit()
        response=jsonify('Car deleted successfully!')
        response.status_code=200  
        return response
    except Exception as e:
        print(e)

###########################
@app.route('/updatecar/<id>' , methods = ['PUT'])
def updateCar(id):
    try:
        args = request.json
        # id_car = args['id']
        model = args['model']
        hp = args['hp']
        marque = args['marque']
        
        if model and hp and marque and request.method=='PUT':

            myCursor = mydb.cursor()

            mycar = car.Car(0 , model ,hp , marque )
            req = "UPDATE car SET model=%s  , hp=%s  , marque=%s  WHERE id_car=%s "
            myCursor.execute(req , (mycar.model , mycar.hp , mycar.marque, id,))
            mydb.commit()
            response = jsonify('Car updated successfully!')
            response.status_code=200
            return response
        else:
            return 'error'
    except Exception as e:
            print(e)




if __name__ == '__main__':
   app.run(host="0.0.0.0", port="5000", debug=True)