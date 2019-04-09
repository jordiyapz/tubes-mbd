const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    searchHistory: {
        type: [String]
    },
    history: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
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

module.exports = mongoose.model('Customer', customerSchema);