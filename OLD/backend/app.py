import time

from flask import Flask

app = Flask(__name__)

def get_hit_count():

@app.route('/')
def hello():
    count = 1
    return 'Hello World! I have been seen {} times.\n'.format(count)

if __name__ == '__main__':
    app.run()