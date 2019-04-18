const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Seller = mongoose.model('Seller');

const listAllProduct = (req, res, next) => {
    Product.find({})
        .populate('seller')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                product: docs
            })
        })
        .catch(err => {
                if(err) res.status(500).json({err: err});
            }
        )
}

const addProduct = (req, res, next) => {
    console.log(req.file);
    const body = req.body;
    const file = req.file;
    const sellerId = body.sellerId;
    Seller.find({_id: sellerId})
        .exec()
        .then(docs => {
            if (docs.length < 1) return res.status(404).json({message: 'Seller not found'});
            const {name, category, description, price} = body;
            let productId = new mongoose.Types.ObjectId();
            const product = new Product({
                _id: productId,
                name: name, 
                seller: sellerId, 
                category,
                description,
                price,
                cost: price
            });
            product.images.push({
                filename: file.filename,
                path: file.path
            });
            const seller = docs[0];
            seller.products.push(productId);
            seller.save()
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ error:error });
                });
            product.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({ message: 'Product added!' });
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({ error:error });
                });
        })
        .catch(err => {
            if (err) return res.status(500).json({err:err});
        })
}

module.exports = {
    listAllProduct,
    addProduct
}