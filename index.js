let express = require('express');
let app = express();

let handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port'));
});