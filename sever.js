const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('./config')
const TaskList = require('./routes/tasklist')
const TaskDao = require('./models/taskDao')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'))
app.use(cookieParser())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

const PORT = process.env.PORT || 8080;

 // view engine setup
 app.set('views', path.join(__dirname, 'views'))
 app.set('view engine', 'jade')


 //Todo App:
 const cosmosClient = new CosmosClient({
   endpoint: config.host,
   key: config.authKey
 })
 const taskDao = new TaskDao(cosmosClient, config.databaseId, config.containerId)
 const taskList = new TaskList(taskDao)
 taskDao
   .init(err => {
     console.error(err)
   })
   .catch(err => {
     console.error(err)
     console.error(
       'Shutting down because there was an error settinig up the database.'
     )
     process.exit(1)
   })

 app.get('/', (req, res, next) => taskList.showTasks(req, res).catch(next))
 app.set('view engine', 'jade')

 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
   const err = new Error('Not Found')
   err.status = 404
   next(err)
 })

 // error handler
 app.use(function(err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message
   res.locals.error = req.app.get('env') === 'development' ? err : {}

   // render the error page
   res.status(err.status || 500)
   res.render('error')
 })

 module.exports = app
  
app.get("/express_backend", (req, res) => {
  res.send("Hello World!");
});

app.post('/post_data',function(req,res){
    let title = req.params.title;
    let content = req.body.content;
    res.send("Post_recieved");
});



// router.delete('/delete_note',function(req,res){
//     var user_name = req.body.user;
//     var password = req.body.password;
//     console.log("User name = "+user_name+", password is "+password);
//     res.end("yes");
//     });

  
app.listen(PORT, console.log(`Server started on port ${PORT}`));