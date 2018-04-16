// load packages
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main'});


// configure to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// static
app.use(express.static(__dirname + '/public'));

// template engine : handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// port
app.set('port', process.env.PORT || 3000);

// TODO : routes
require('./routes/routes')(app);

app.use(function(req, res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port'));
});