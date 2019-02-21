var express = require('express');
var port = 81;
var history = require('connect-history-api-fallback');
var app = express();

var router = express.Router();
router.get('/',function(req,res,next){
	req.url = '/index.html';
	next();
})
app.use(router);
app.use(history());


//2、路由
var routes = express.Router();
app.use('/api',routes);

//定义static目录，指向./dist目录
app.use(express.static('./admin'));

//启动express
module.express = app.listen(port,function(err){
	if (err) {
		console.log(err);return;
	}
	console.log('http://localhost:'+port+'\n');
})


