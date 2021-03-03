var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var app = express();
//Socket Setup
server = require('http').Server(app),
	io = require("socket.io")(server, {
		cors: {
			origin: '*',
			methods: ["GET", "POST"],
			credentials: 'false'
		}
	});

server.listen(4167, () => {
	console.log('Server has started up')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
var indexRouter = require('./routes/index');

app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});


//socket.io
io.on('connection', function (socket) {
	console.log('a user connected');

	socket.emit('connectClient');

	socket.on('disconnect', function () {
		console.log("User Disconnected")
	});

	setInterval(() => {
		io.emit('ping', { date: (new Date()).toTimeString() });
	}, 1000);
});


// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
module.exports = app;
