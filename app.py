from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return "Instagram-Check läuft (nutze /instagram/user/tagesschau)"