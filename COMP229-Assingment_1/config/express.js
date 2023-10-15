var express = require('express'),
    bodyParser = require('body-parser');


module.exports = function(){
    var app = express();
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    //require('../app/routes/index.server.routes.js')(app);
    app.use('/', require('../app/routes/index.server.routes.js'));

    app.use(express.static('./public'));
    app.use('/css', express.static(__dirname + '/public/css'));


    return app;
}