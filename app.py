from flask import Flask, request, render_template
from flask_restful import Resource, Api
from api.customer import CustomerApi
import json

from data.Cache import Cache



app = Flask(__name__)
api = Api(app)
cache = Cache('customerData.csv')

api.add_resource(CustomerApi,'/v1/customer/name/<string:name>','/v1/customer/id/<int:id>','/v1/customer/',resource_class_kwargs={'cache':cache});


@app.route('/')
def index():
    customers = [*cache.customers.values()];
    print(*customers);
    return render_template('index.html',customers=customers);


if __name__ == '__main__':
    app.run(debug=True)