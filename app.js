const express = require('express');
const app = express();
const productRouter = require('./api/routes/product');
const orderRouter = require('./api/routes/order');
const userRouter = require('./api/routes/user');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');

mongoose.connect('mongodb+srv://Muneebrasheed:muneeb123@cluster0.nrodrnr.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('MongoDB CONNECTED')
}).catch(err => console.log(err.message))

mongoose.set('strictQuery', true);

// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// this middle ware is use for handel the Cores Error (Cores errors are security mechanism by the browser)
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With ,Content-Type , Accept,Authorization');
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Controll-Allow-Methods', 'PUT,POST,PATCH,DELETE');
//         return res.status(200).json({});
//     }

//     //my request is stuck beacuse i am not sending request to next
//     next();
// })
app.use(cors());

app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);

})


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});
module.exports = app;