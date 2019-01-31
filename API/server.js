var express = require('express');
var app = express();
var routes = require('./routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop', {useNewUrlParser:true});


app.use(bodyParser.json()); /*middleware*/
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

app.listen(3000, ()=>{
    console.log('Swag Shop API running on port 3000...');
});