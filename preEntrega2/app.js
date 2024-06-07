const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const productRouterFn = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const messageRouter = require('./routes/messageRouter');
const viewsRouter = require('./routes/viewsRouter');
const errorHandler = require('./middlewares/errorHandler');
const socketServer = require('./utils/io');
require('dotenv/config');