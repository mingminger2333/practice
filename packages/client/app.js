const Express = require('express');
const path = require('path');
const routes = require('./router');
const config = require('./config');

const app = module.exports = new Express();

// view
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// static
app.use('/static', Express.static(path.join(__dirname, 'dist')));

// config
app.locals.config = config;

// router
app.use('/', routes);

if (!module.parent) app.listen(config.port);