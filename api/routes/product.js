const express = require('express');

const router = express.Router();

const Product = require('../modal/product')

const checkAuth = require('../middleware/check-auth')

router.get('/', (req, res, next) => {
    Product.find().limit(2).then(docs => {
        if (docs) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({ message: 'No records Found' });
        }
    }).catch(err => {
        res.status(500).json({ error: err })
    })

});

//we also add the authentication in post method 
router.post('/', checkAuth, (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    // this the method to save data on mongo db
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handlinging post Request',
            product
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })


})


router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: 'No valid entry found for provided Id' });
        }

    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })
})


router.put('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findOneAndUpdate({ _id: id }, { $set: { name: req.body.name } }).then(val => {
        res.status(200).json(val)
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })

})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id }).then(val => {
        if (val.deletedCount != 0) {
            res.status(200).json(val)
        } else {
            res.status(404).json({
                message: 'Product Id not found',
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })

})

module.exports = router;