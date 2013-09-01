var express = require('express');


var app = express();

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
});

app.use(express.static('public'));

var port = process.env.PORT || 3000;

app.listen(port);
console.log('listening on port ' + port);
