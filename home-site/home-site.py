from flask import Flask, render_template
from flask_bower import Bower
from flask_socketio import SocketIO
import eventlet
import urllib
import json
import time

eventlet.monkey_patch()
app = Flask(__name__)
socketio = SocketIO(app)
thread = None


def background_thread():
    while True:
        time.sleep(1)
        response = urllib.request.urlopen('http://gabrielgio.com.br:3000/api/active').read()
        socketio.emit('message', json.loads(response))


@socketio.on('connect')
def connect():
    global thread
    if thread is None:
        thread = socketio.start_background_task(target=background_thread)


@app.route('/')
def index():
    return render_template('home.html')


@app.route('/links')
def links():
    return render_template('links.html')


@app.route('/dash')
def dash():
    response = urllib.request.urlopen('http://gabrielgio.com.br:3000/api/active').read()
    return render_template('dashboard.html', data=json.loads(response))


if __name__ == '__main__':
    Bower(app=app)
    socketio.run(app, port=5000, debug=True)
