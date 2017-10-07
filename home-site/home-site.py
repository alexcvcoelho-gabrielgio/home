from flask import Flask, render_template
from flask_bower import Bower

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('home.html')

@app.route('/links')
def links():
    return render_template('links.html')


if __name__ == '__main__':
    Bower(app=app)
    app.run(host='0.0.0.0')
