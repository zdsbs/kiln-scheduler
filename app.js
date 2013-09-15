var express = require('express'),
	mongoskin = require('mongoskin');

var app = express();

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
});

app.use(express.static('public'));


var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';
console.log(mongoUri);
var db = mongoskin.db(mongoUri);

var port = process.env.PORT || 3000;

app.listen(port);
console.log('listening on port ' + port);
