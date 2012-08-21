
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);
var global_sockets = {};

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: '319jkdjjioasfs' }));
  //app.use(express.compiler({ src: __dirname + '/public', enable: ['sass'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res){
  res.render('index', {
  });
});

app.post('/sendgrid/ipn', function(req, res){
  params = req.body
  email = params.email

  for(var i in global_sockets) {
    global_sockets[i].emit('incoming', params);
  }
  //post successful 200 back to sendgrid
  res.send(200);
});

//IO server
io.sockets.on('connection', function(socket){
  global_sockets[socket.id] = socket;
  socket.on('disconnect', function () { 
    delete global_sockets[socket.id];
  });

});

app.listen(3000);
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
