from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # A definir si es el QR
    id_user_ghop = db.Column(db.Integer, unique=False, nullable=False)
    fullname = db.Column(db.String(200), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.fullname}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_user_ghop": self.id_user_ghop,
            "fullname": self.fullname     
        }


class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(200), unique=True, nullable=False)
    first_name = db.Column(db.String(50), unique=False, nullable=False)
    last_name = db.Column(db.String(50), unique=False, nullable=False)


    def __repr__(self):
        return f'<Customer {self.user_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.user_name,
            "first_name": self.first_name,
            "last_name": self.last_name
        }


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    pricing = db.Column(db.Float, unique=False, nullable=False)
    fk_category_id = db.Column(db.Integer, db.ForeignKey('category.id'), unique=False, nullable=False)
    category = db.relationship('Category')
    
    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "pricing": self.pricing,
            "category_id": self.fk_category_id
        }


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    
    def __repr__(self):
        return f'<Category {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Bill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    fk_product_id = db.Column(db.Integer, db.ForeignKey('product.id'), unique=False, nullable=False)
    fk_customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), unique=False, nullable=False)
    product = db.relationship('Product')
    customer = db.relationship('Customer')
    
    quantity = db.Column(db.Integer, unique=False, nullable=False)
    unit_price = db.Column(db.Float, unique=False, nullable=False)
    
    fk_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User')
    

    def __repr__(self):
        return f'<Bill {self.created_at}>'

    def serialize(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "product_id": self.fk_product_id,
            "customer_id": self.fk_customer_id,
            "quantity": self.quantity,
            "unit_price": self.unit_price,
            "user_id": self.fk_user_id,
        }
