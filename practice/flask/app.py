from flask import Flask,render_template

app = Flask(__name__)

@app.route("/")
def hello():
    user_name = "ranveer singh"
    return render_template('index.html' , user_name = user_name) 


@app.route("/ranveer")
def details():
    return "what is your name and details"
app.run(debug=True)