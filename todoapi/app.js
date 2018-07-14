// required modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // logging in dev terminal
var cors = require('cors'); // allows restricted info to be shared as needed

// calls the todos file in routes folder and assigns to var
var todosRouter = require('./routes/todos');
// assigns express to app var
var app = express();

// NOTE: not needed at this time// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//uses morgan npm in dev env
app.use(logger('dev'));
// allows json parsing
app.use(express.json());
// allows for url encoding
app.use(express.urlencoded({ extended: false }));
// NOTE: not used at this time - part of express generator set up
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());  // uses cors npm


// assigns todos as root
app.use('/todos', todosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('There has been an error. Please verify you have a the correct route. ')
});

module.exports = app;
