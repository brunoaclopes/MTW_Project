var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
    console.log('middleware');
    next();
})

require('./routes/student.routes')(router);
require('./routes/class.routes')(router);
require('./routes/course.routes')(router);
require('./routes/evaluation.routes')(router);
require('./routes/lesson.routes')(router);
require('./routes/schoolYear.routes')(router);


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);
