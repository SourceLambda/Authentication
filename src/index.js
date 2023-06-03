const express = require("express");
const routerApi = require("./routes");
const ldap = require("ldapjs");

const {logErrors, errorHandler, boomErrorHandler}= require("./middlewares/error.handler");
const {checkApiKey} = require("./middlewares/auth.handler");

const { config } = require("./config/config");

const app = express();
const port = config.port;


//Middleware to receive data in a JSON way
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("Source Lambda is working!");
  authenticateDN("cn=admin,dc=arqsoft,dc=unal,dc=edu,dc=co","admin");
});

app.get("/test",
  checkApiKey,
  (req,res)=>{
    res.send("It is working!");
})

require("./utils/auth");

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


function authenticateDN(username,password){
  const client = ldap.createClient({
    url: ['ldap://172.30.0.1:389', 'ldap://172.30.0.1:636']
  });

  client.bind(username,password, (err) => {
    if(err){
      console.log(`Error in new connection ${err}`);
    }else{
      console.log("Authenticate with LDAP is a successed!");
    }
  });

};


