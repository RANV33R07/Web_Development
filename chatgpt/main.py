from flask import Flask,render_template,request,jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://ranveer072002:mongodb8346.@ranv33r.54xb2bg.mongodb.net/chatgpt"
mongo = PyMongo(app)


@app.route("/api" , methods = ["GET","POST"])
def qa():
    if (request.method == "POST"):
        print(request.json)
        question = request.json.get("question")
        data = {"result" : f"Answer of : {question}"}
        return jsonify(data)

@app.route('/')
def home():
    chats = mongo.db.data.find({})
    mychats = [chat for chat in chats]
    print(mychats)
    return render_template("index.html")


app.run(debug=True)