"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_sqlalchemy import SQLAlchemy
from api.models import db, User, Product, Customer, Category, Bill
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/users', methods=['GET', 'POST'])
def handle_users():

    if request.method == 'GET':

        users = db.session.execute(db.select(User).order_by(User.fullname)).scalars()
        results = [item.serialize() for item in users]
        response_body = {"Message": "List of user register",
                         "users:": results}

        return response_body, 200

    if request.method == 'POST':
        
        # 1. Obtener el contenido JSON de la solicitud POST entrante utilizando el objeto request. El método get_json() analiza y devuelve el contenido JSON de la solicitud
        request_body = request.get_json()
        
        # 2. Verificar si el usuario ya existe en la base de datos
        existing_user = User.query.filter_by(id_user_ghop=request_body["id_user_ghop"]).first()
        
        if existing_user:
            response_body = {"message": "User already exists."}
            return jsonify(response_body), 400

        # 3. Crear instancia de la clase User. Los valores para las propiedades id_user_ghop y fullname se toman del request_body
        new_user = User(id_user_ghop=request_body["id_user_ghop"],
                        fullname=request_body["fullname"])
        
        # 4. Agrega el objeto new_user a la base de datos
        db.session.add(new_user)
        # 5. Confirmar los cambios
        db.session.commit()

        response_body = {"message": "User registered successfully",
                        "new user": request_body}
        return jsonify(response_body), 200


@api.route('/products', methods=['GET', 'POST'])
def handle_products():

    if request.method == 'GET':
        
        products = db.session.execute(db.select(Product).order_by(Product.name)).scalars()
        results = [product.serialize() for product in products]
        response_body = {"Message": "List of products",
                         "products": results}
        return response_body, 200

    if request.method == 'POST':
        
        request_body = request.get_json()

        existing_product = Product.query.filter_by(name=request_body["name"]).first()
        
        if existing_product:
            response_body = {"message": "Product already exists."}
            return jsonify(response_body), 400
            
        product = Product(
            name=request_body["name"],
            pricing=request_body["pricing"],
            fk_category_id=request_body["fk_category_id"]
        )

        db.session.add(product)
        db.session.commit()

        response_body = {"message": "Product registered successfully",
                         "new product": request_body}
        return response_body, 200


@api.route('/products/<int:id>', methods=['GET', 'PUT'])
def handle_products_id(id):

    if request.method == 'GET':
        product = db.get_or_404(Product, id)
        response_body = {'resultado': product.serialize()}
        return response_body, 200

    if request.method == 'PUT':

        request_body = request.get_json()
        product = db.get_or_404(Product, id)

        # Verificar si el nuevo nombre ya existe en otros productos
        new_name = request_body['name']
        existing_product_with_name = Product.query.filter(Product.name == new_name, Product.id != id).first()
        
        if existing_product_with_name:
            response_body = {"message": "The product name already exists."}
            return jsonify(response_body), 400
        
        # Si el nombre es único, actualiza el producto
        product.name = new_name
        product.pricing = request_body['pricing']
        product.fk_category_id = request_body['fk_category_id']

        db.session.commit()

        response_body = {"message": 'Updating product',
                         "result": request_body}
        return response_body, 200


@api.route('/customers', methods=['GET', 'POST'])
def handle_customers():

    if request.method == 'GET':

        customers = db.session.execute(db.select(Customer).order_by(Customer.user_name)).scalars()
        results = [item.serialize() for item in customers]
        response_body = {"Message": "List of user register",
                         "users:": results}

        return response_body, 200

    if request.method == 'POST':
        
        request_body = request.get_json()
        
        existing_customer = Customer.query.filter_by(user_name=request_body['user_name']).first()

        if existing_customer:
            response_body = {"message": "Customer whit  already exists"}
            return response_body, 400

        new_customer = Customer(user_name=request_body["user_name"],
                               first_name=request_body["first_name"],
                               last_name=request_body["last_name"])

        db.session.add(new_customer)
        db.session.commit()

        response_body = {"message": "Customer registered successfully",
                         "new user": request_body}
        return response_body, 200


@api.route('/customers/<int:id>', methods=['GET', 'PUT'])
def handle_customer_id(id):

    if request.method == 'GET':
        customer = db.get_or_404(Customer, id)
        response_body = {"resultado": customer.serialize()}
        return response_body, 200

    if request.method == 'PUT':

        request_body = request.get_json()
        customer = db.get_or_404(Customer, id)

        new_username = request_body['user_name']
        existing_customer_whit_username = Customer.query.filter_by(Custumor.user_name == new_username, Customer.id != id ).first()

        if new_username:
            response_body = {"message": "The customer with user name already exists."}
            return response_body, 400

        customer.user_name = request_body['user_name']
        customer.first_name = request_body['first_name']
        customer.last_name = request_body['last_name']

        db.session.commit()

        response_body = {"message": 'Updating product',
                         "result": request_body}
        return response_body, 200


@api.route('/category', methods=['GET', 'POST'])
def handle_categories():
    
    if request.method == 'GET':

        categories = db.session.execute(db.select(Category).order_by(Category.name)).scalars()
        results = [category.serialize() for category in categories]
        response_body = {"Message": "List of categories",
                         "categories": results}
        return response_body, 200

    if request.method == 'POST':
        request_body = request.get_json()

        existing_category = Category.query.filter_by(name=request_body["name"]).first()
        
        if existing_category:
            response_body = {"message": "Category already exists."}
            return jsonify(response_body), 400

        categories = Category(id=request_body["id"],
                              name=request_body["name"])
        db.session.add(categories)
        db.session.commit()

        response_body = {"message": "Category registered successfully",
                         "new category": request_body}
        return response_body, 200


@api.route('/category/<int:id>', methods=['GET', 'PUT'])
def handle_categories_id(id):

    if request.method == 'GET':
        
        category = db.get_or_404(Category, id)
        response_body = {"resultado": category.serialize()}
        return response_body, 200

    if request.method == 'PUT':
        request_body = request.get_json()
        category = db.get_or_404(Category, id)

        # Nuevo nombre de categoría
        new_category_name = request_body['name']

        # Verificar si existe una categoría con el nuevo nombre (distinta de la categoría actual)
        existing_category_with_name = Category.query.filter(Category.name == new_category_name, Category.id != id).first()

        if existing_category_with_name:
            response_body = {"message": "The category with that name already exists."}
            return response_body, 400

        # Actualizar la categoría
        category.name = new_category_name
        db.session.commit()

        response_body = {"message": 'Updated category',
                        "status": 'ok',
                        "result": request_body}
        return response_body, 200



@api.route('/bills', methods=['GET', 'POST'])
def handle_bills():

    if request.method == 'GET':
        bills = db.session.execute(db.select(Bill).order_by(Bill.created_at)).scalars()
        results = [bill.serialize() for bill in bills]
        response_body = {"Message": "List of bills",
                         "products": results}
        return response_body, 200

    if request.method == 'POST':
        
        request_body = request.get_json()
        # Obtengo la info del request_body para realizar la posterior verificacion
        user_id = request_body['user_id']
        product_id = request_body['product_id']
        customer_id = request_body['customer_id']
        
        # Verifico que los id enviados existen en la base de datos
        user = db.session.execute(db.select(User).filter_by(id=user_id)).scalar_one()
        product = db.session.execute(db.select(Product).filter_by(id=product_id)).scalar_one()
        customer = db.session.execute(db.select(Customer).filter_by(id=customer_id)).scalar_one()

        # si user, product o curstumer no existen, return error datos incorrectos sino que me cree la bill
        if not user or not product or not customer:
            return ({"message": "User or customer or product not exist"}), 401

        bill = Bill(created_at=request_body["created_at"],
                    fk_product_id=request_body["product_id"],
                    fk_customer_id=request_body["customer_id"],
                    quantity=request_body["quantity"],
                    unit_price=request_body["unit_price"],
                    fk_user_id=request_body["user_id"])

        db.session.add(bill)
        db.session.commit()

        response_body = {"message": "Product registered successfully",
                         'new bill': request_body}

        return response_body, 200


"""
Pendiente definir como realizar el login
Enlazar el endpoint de Bill con el front para traer cada carrito de compras cerrado que el el que me alimentara la bill

"""
