let main = require('./main');
module.exports = function(app){

    // Main 그룹
    app.get('/', main.home);
    app.get('/newsletter', main.newsletter);
    app.post('/process', main.process);
}