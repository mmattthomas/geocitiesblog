var history = require('connect-history-api-fallback');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(history());    // needed for router to work in spa
app.use(serveStatic(__dirname + ""));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started :'+ port + " for " + __dirname + "");