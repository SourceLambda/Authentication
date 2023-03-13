const express = require("express");
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
  res.send("Hello this is my first test with NodeJS");
});

app.listen(port,()=>{
  console.log("This is working!");
});
