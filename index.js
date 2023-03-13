const express = require("express");
const routerApi = require("./routes");
const app = express();
const port = 3000;

//Middleware to receive data in a JSON way
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("Hello this is my first test with NodeJS");
});

//To implement the routing to every responsbility
routerApi(app);

//To show what is the port using in the app.
app.listen(port,()=>{
  console.log("This is working!");
});
