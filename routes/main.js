let Post = require('../models/post.js');

exports.home = function(req,res){
    Post.find((err, posts) => {
        res.render('home', { posts: posts });    
    });
}

exports.newsletter = function(req,res){
    res.render('newsletter', { csrf: 'CSRF token here' });
}

exports.process = function(req, res){
    if(req.query.form){
        console.log('Form (from querystring): ' + req.query.form);
        for(key in req.body){
            console.log(`${key} field: ${req.body[key]}`);
        }
    }
    res.redirect(303, '/');
}

