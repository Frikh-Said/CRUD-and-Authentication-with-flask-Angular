from flask import Flask, request  , jsonify
import myCar as car
import json
from flask_cors import CORS, cross_origin
import mysql.connector
import pymysql

app = Flask(__name__)
cors = CORS(app)

mydb = mysql.connector.connect(
            host="127.0.0.1",
            user="root",
            password="",
            database="crudcar"
        )
   
# les web methods 

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
    

@app.route('/detailcar/<int:car_id>')
def detailCar(car_id):
    try:
        myCursor = mydb.cursor()
        
        req = "SELECT * FROM car WHERE id=%s"
        myCursor.execute(req , (int(car_id),))
        myresult=myCursor.fetchone()
        response=jsonify(myresult)
        response.status_code=200
        return response
    except Exception as e:
        print("hhhhhhhhhhhhhhhhhhhhhh")

@app.route('/updatecar' , methods = ['PUT'])
def updateCar():
    try:
        args = request.json
        id_car = args['id']
        model = args['model']
        hp = args['hp']
        marque = args['marque']
        
        if id_car and model and hp and marque and request.method=='PUT':

            myCursor = mydb.cursor()

            mycar = car.Car(0 , model ,hp , marque )
            req = "UPDATE car model=%s  , hp=%s  , marque=%s  WHERE id=%s "
            val = (mycar.model , mycar.hp , mycar.marque)
            myCursor.execute(req , val)
            mydb.commit()
            response = jsonify('Car updated successfully!')
            response.status_code=200
            return response
        else:
            return 'error'
    except Exception as e:
            print(e)

  
@app.route('/deletecar/<int:id>' , methods = ['DELETE'])
def deleteCar(id):
    try:
        myCursor = mydb.cursor()

        req = "DELETE FROM  car WHERE id_car=%s"
        myCursor.execute(req , int(id),)
        mydb.commit()
        response=jsonify('Car deleted successfully!')
        response.status_code=200  
        return "wyyyyyy"
    except Exception as e:
        print(e)


@app.route('/cars' , methods = ['GET'])
def getCars():
    mylist = []
    req = "select * from car"
    

    myCursor = mydb.cursor()
    myCursor.execute(req)
    myresult = myCursor.fetchall()
    for x in myresult:
        mylist.append(car.Car(x[0] ,x[1], x[2] , x[3]).__dict__)

    return json.dumps(mylist)




 




# if __name__ == '__main__':
#    app.run(host="0.0.0.0", port="5000", debug=True)