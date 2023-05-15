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
   
# les web methods 

@app.route('/savecar' , methods = ['POST'])
def saveCar():
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
    print(myCursor.rowcount, "record ins")

  
    return "Saved : "


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




 




if __name__ == '__main__':
   app.run(host="0.0.0.0", port="5000", debug=True)