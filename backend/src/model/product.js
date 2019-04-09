const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Seller'
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

module.exports = mongoose.model('Product', productSchema);