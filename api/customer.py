from flask import request, jsonify
from flask_restful import Resource
import json


class CustomerApi(Resource):
    def __init__(self,**kwargs):
        self.cache = kwargs['cache']  

    def get(self):
        name = request.args.get('name')
        id = request.args.get('id')
        if name is not None or id is not None:
            for customer in self.cache.customers:
                if name is not None and customer['fullname'] == name:
                    return jsonify(customer);
                if name is not None and customer['id'] == id:
                    return jsonify(customer);

        return jsonify(self.cache.customers);



    def put(self):
        name = request.args.get('name')
        id = request.args.get('id')
        profession = request.args.get('profession')
        relationshipStart = request.args.get('relStart')
        relationshipEnd = request.args.get('relEnd')
        if name is not None or id is not None:
            for customer in self.cache.customers:
                if name is not None and customer['fullname'] == name:
                    return jsonify(customer);
                if name is not None and customer['id'] == id:
                    return jsonify(customer);

        return;

