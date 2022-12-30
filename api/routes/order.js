const express = require('express');
const Order = require('../modal/order')
const Product = require('../modal/product')

const router = express.Router();
router.get('/', (req, res, next) => {
    Order.find().populate('productId', 'name').select('productId quantity _id').then(val => {
        res.status(200).json(val)
    }).catch(err => {
        res.status(505).json({
            error: err
        })
    })

})


router.post('/', (req, res, next) => {
    const order = new Order({
        productId: req.body.productId,
        quantity: req.body.quantity
    })

    Product.findById(req.body.productId).then(
        prc => {
            if (prc) {
                order.save().then(val => {
                    res.status(201).json({
                        message: 'Order was created',
                        order
                    })
                }).catch(err => {
                    res.status(505).json({
                        error: err
                    })
                })

            } else {
                res.status(404).json({ message: 'No valid entry found for provided Id for product' });
            }
        }
    ).catch(erro => {
        res.status(505).json({
            error: erro
        })
    })



})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id).then(doc => {
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
router.delete('/:orderId', (req, res, next) => {

    const id = req.params.orderId;
    Order.remove({ _id: id }).then(val => {
        if (val.deletedCount != 0) {
            res.status(200).json(val)
        } else {
            res.status(404).json({
                message: 'Order Id not found',
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })

})


module.exports = router;