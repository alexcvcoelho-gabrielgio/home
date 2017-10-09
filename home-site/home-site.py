from flask import Flask, render_template
from flask_bower import Bower
from flask_sockets import Sockets
import os
import urllib2
import json
import time

app = Flask(__name__)
sockets = Sockets(app)


@sockets.route('/info')
def echo_socket(ws):
    while not ws.closed:
        time.sleep(1)
        response = urllib2.urlopen('http://localhost:3000/api/active').read()
        ws.send(response)


@app.route('/')
def index():
    return render_template('home.html')


@app.route('/links')
def links():
    return render_template('links.html')


@app.route('/dash')
def dash():
    response = urllib2.urlopen('http://localhost:3000/api/active').read()
    return render_template('dashboard.html', data=json.loads(response))


if __name__ == '__main__':
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler

    Bower(app=app)

    server = pywsgi.WSGIServer(('', 5000), app, handler_class=WebSocketHandler)
    server.serve_forever()

    app.run(host='0.0.0.0')
