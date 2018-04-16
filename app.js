// load packages
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main'});
let mongoose = require('mongoose');
let Post = require('./models/post.js')
// configure to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// static
app.use(express.static(__dirname + '/public'));

// template engine : handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// port
app.set('port', process.env.PORT || 3000);

// routes
require('./routes/routes')(app);


// mongoose
mongoose.connect('mongodb://localhost:27017/testDB');
let db = mongoose.connection;  // Mongoose creates a default connection when you call mongoose.connect(). 

db.on('error', () => console.log('Connection Failed!'));
db.once('open', () => console.log('Connected!'));

// initializing database
Post.find(function(err, posts){
    if(err) return console.error(err);
    if(posts.length) return;

    new Post({
        name: 'Joonmo',
        content: 'Nice weather!'
    }).save();

    new Post({
        name: 'Tom',
        content: 'Still hungry :('
    }).save();
    
    new Post({
        name: 'Uribe',
        content: 'anybody wants to go to see movie?'
    }).save();
      
});

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