'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    birthdate: Date,
    phoneNumber: {
        type: String,
        required: true
    },
    address: [{
        lists: [{
            country: String,
            city: String,
            street: String,
            zipcode: String
        }],
        primary: {
            type: Number,
            default: -1
        }
    }]
});

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        required: true
    },
    images: [{
        filename: String
    }],
    files: [{
        filename: String
    }],
    category: {
        type: String,
        default: 'other'
    },
    description: String,

    attributes: [{
        name: String,
        choices: [String]
    }],
    
    price: Schema.Types.Decimal128,
    discount: Number,
    cost: Schema.Types.Decimal128,

    available: Boolean,
    sold: Number,

    rating: {
        type: Schema.Types.Decimal128,
        min: 0,
        max: 5
    },
    reviews: [{
        userId: Schema.Types.ObjectId,
        rating: {
            type: Schema.Types.Decimal128,
            min: 0,
            max: 5
        },
        comment: String,
        timestamp: {
            type: Date,
            default: Date.now()
        }
    }],
    datePosted: {
        type: Date,
        default: Date.now()
    }
});

const customerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    wishlists: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    carts: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        qty: Number
    }]
});

const sellerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    status: {
        type: String,
        enum: [null, 'Star Seller', 'Best Seller'],
        default: null
    }
})

const UserModel = mongoose.model('User', userSchema);
const ProductModel = mongoose.model('Product', productSchema);
const CustomerModel = mongoose.model('Customer', customerSchema);
const SellerModel = mongoose.model('Seller', sellerSchema);

module.exports = {
    UserModel,
    ProductModel,
    CustomerModel,
    SellerModel
}