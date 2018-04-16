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
        author: 'Joonmo',
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    }).save();

    new Post({
        author: 'Tom',
        content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32."
    }).save();
    
    new Post({
        author: 'Uribe',
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."    }).save();
      
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