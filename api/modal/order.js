const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Orders', orderSchema);