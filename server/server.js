const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    userRouter = require('./routes/users.js'),
    productRouter = require('./routes/productRouter.js'),
    commentRouter = require('./routes/commentRouter.js'),
    serviceRouter = require('./routes/serviceRouter.js'),
    orderRouter = require('./routes/orderRouter.js');

// Use env port or default
const port = process.env.PORT || 5000;

// Connect to database
mongoose.connect(process.env.DB_URI || require('./config/config.js').db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(connect => console.log('connected to mongodb..'))
.catch(e => console.log('could not connect to mongodb', e));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {mongoose}

// initialize app
const app = express();
// enable request logging for development debugging
app.use(morgan('dev'));
// body parsing middleware
app.use(bodyParser.json());

// routers
app.use('/api/users', userRouter);
app.use('/products', productRouter);
app.use('/comments', commentRouter);
app.use('/services', serviceRouter);
app.use('/orders', orderRouter);


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

app.listen(port, () => console.log(`Server now running on port ${port}!`));
