from flask import Flask,request,make_response
from flask_cors import CORS
import mysql.connector
from runenv import load_env
import os
import mysql.connector
import json

app=Flask(__name__)
CORS(app)

user= os.environ.get('user')
host= os.environ.get('host')
password= os.environ.get('password')
database= os.environ.get('database')
config = {
'user':user,
'host':host,
'password':password,
'database':database
}
 

@app.route('/getdata', methods=['POST'])
def givedata():
    if request.method == 'POST':
        mydb=mysql.connector.connect(**config)
        mycursor=mydb.cursor()
        Table=[]
        mycursor.execute("SELECT USERNAME,DATE_FORMAT(TASKDATE,'%d/%m/%y'),DATE_FORMAT(TASKTIME,'%H:%i'),TASK FROM TODO")
        for x in mycursor:
            Table.append(list(x))
        table_json=[]
        for row in Table:
            temp={'username':row[0],'taskdate':row[1],'tasktime':row[2],'taskname':row[3]}
            table_json.append(temp)
        return json.dumps(table_json)

@app.route('/auth', methods=['POST','OPTIONS'])
def checktable():
   if request.method == "POST":
       details=request.get_json()
       username=details['username']
       taskdate=details['date']
       tasktime=details['time']
       taskname=details['taskname']
       mydb=mysql.connector.connect(**config)
       mycursor=mydb.cursor()
       print("Entered Here :)")
       mycursor.execute("INSERT INTO TODO VALUES(%s,%s,%s,%s)",(username,taskdate,tasktime,taskname))
       mydb.commit()
       return ({"username":username,"taskname":taskname})
   
   if request.method == "OPTIONS":
       response = make_response()
       response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
       response.headers.add('Access-Control-Allow-Headers', "Content-Type, Authorization")
       response.headers.add('Access-Control-Allow-Methods', "POST")
       response.headers.add('Access-Control-Allow-Credentials', 'true')
       print('Before Returning')
       return response

if __name__ == '__main__':
    app.run(debug=True,port=3001)
