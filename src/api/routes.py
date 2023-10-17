"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_sqlalchemy import SQLAlchemy
from api.models import db, User, Product, Customer, Category, Bill
from api.utils import generate_sitemap, APIException
import os
import requests
import json


api = Blueprint('api', __name__)


@api.route('/open-store', methods=['POST'])
def handle_open_store():
    """
    Recibe: vendorQr: QR del vendedor
    Devuelve: user: {id: id del vendor, name: name del vendor}
              token: token
              categories: lista de categorias
              products: lista de productos comprados en "auto", vacía si no hay compras
    """
    request_body = request.get_json()
    vendor_qr = request_body["vendorQr"]
    response_body = {}

    # TODO: Validar con endpoint de Ghop (aún no está el endpoint), verificar si está en nuestra db y si no está, crearlo
    user = {"id": 1, "name": "Andrea"}
    response_body["user"] = user
    # TODO: implemtar token
    token = ''
    response_body["token"] = token

    # Obtiene las categorías
    url = f'{os.getenv("BACKEND_URL_GHOP")}products/families'
    payload = {}
    headers = {'X-Api-Key': os.getenv("API_KEY_GHOP"),
               'X-Language': 'es-ES'}
    response = requests.request("GET", url, headers=headers, data=payload)
    categories = json.loads(response.text)
    for item in categories:
        category_name = Category.query.filter_by(name=item["name"]).first()
        if not category_name:
            # TODO: Agrego la categoria en mi base customer
            pass
    response_body["categories"] = categories

    # Obtiene los productos
    url = f'{os.getenv("BACKEND_URL_GHOP")}products'
    payload = {}
    headers = {'X-Api-Key': os.getenv("API_KEY_GHOP"), 
               'X-Language': 'es-ES'}
    response = requests.request("GET", url, headers=headers, data=payload)
    products = json.loads(response.text)
    for item in products:
        product_name = Product.query.filter_by(name=item["name"]).first()
        if not product_name:
            # TODO: Agrego la categoria en mi base customer
            pass
        else: 
            # TODO: Cambiar el valor de los precios en todos los productos en nuestra base db
            pass
    response_body["products"] = products
    return {'results': response_body}, 200



@api.route('/purchase-carts', methods=['POST'])
def handle_purchase_carts():
    """
    Recibe: customerQr - Qr del cliente, 
    Devuelve: id: id del cart, 
              customer: {id: id del cliente, name; nombre del cliente
              products: lista de diccionarios de productos comprados por el cliente (vacio si no compró nada)
    """
    request_body = request.get_json()
    customer_qr = request_body["customerQr"]
    deleted= 'false'
    url = f'{os.getenv("BACKEND_URL_GHOP")}purchase-carts?customerQr={customer_qr}&deleted={deleted}'
    payload = {}
    headers = {'X-Api-Key': os.getenv("API_KEY_GHOP"), 
               'X-Language': 'es-ES'}
    response = requests.request("GET", url, headers=headers, data=payload)
    response_body = json.loads(response.text)
    customer = Customer.query.filter_by(customer_user_ghop=response_body[0]["customer"]["id"]).first()
    if not customer:
        customer = Customer(user_name=response_body[0]["customer"]["name"],
                            customer_user_ghop=response_body[0]["customer"]["id"],)
        db.session.add(customer)
        db.session.commit()
    return {'results': response_body}, 200


@api.route('/purchase-carts/<int:id>', methods=['POST'])
def handle_purchase_carts_id(id):
    """
    Recibe: id: id del cart como parametro de la url
            customerId: id del cliente
            products: lista de diccionarios {id: id del producto, delta: cantidad}
    """
    request_body = request.get_json()
    cart_id = id
    products= request_body["products"]  # products es una array de objetos {id: 4, delta: 5}
    customer_id = request_body["customerId"]
    url = f'{os.getenv("BACKEND_URL_GHOP")}purchase-carts/{cart_id}/products'
    payload = json.dumps(products)
    headers = {'Content-Type': 'application/json',
               'X-Api-Key': os.getenv("API_KEY_GHOP"),
               'X-Language': 'es-ES'}
    response = requests.request("POST", url, headers=headers, data=payload)
    response_body_ghop = json.loads(response.text)
    # TODO: Grabar nuestro bill
    response_body = {"status": "Ok", "Message": "Carrito cerrado correctamente"}
    return {'results': response_body}, 200
