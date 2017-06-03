/**
 * Created by dong on 2017/6/1.
 */
const express = require('express');
const path = require('path');
const config = require('config-lite')(__dirname);
const index = require('./routes/index');
const api = require('./routes/api');
const pkg = require('./package');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', index);
app.use('/api', api);
app.use(function (err, req, res, next) {
  // console.error(err.stack)
  res.status(500)
  res.send('error', { error: err })
})
app.listen(config.port, function () {
console.log(`${pkg.name} listening on port ${config.port}`);
});
