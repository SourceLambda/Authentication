const express = require("express");
const routerApi = require("./routes");

const {logErrors, errorHandler, boomErrorHandler}= require("./middlewares/error.handler");
const {checkApiKey} = require("./middlewares/auth.handler");

const app = express();
const port = 3000;

//Middleware to receive data in a JSON way
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("Hello this is my first test with NodeJS");
});

app.get("/test",
  checkApiKey,
  (req,res)=>{
    res.send("It is working!");
})

//To implement the routing to every responsbility
routerApi(app);
//The following two things have to appear after the routing
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//To show what is the port using in the app.
app.listen(port,()=>{
  console.log("This is working!");
});
