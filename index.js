const express = require("express");
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
  res.send("Hello this is my first test with NodeJS");
});

//To show all users in a different way, by parameters
app.get("/users",(req,res)=>{
  const {limit, offset} = req.query;
  if (limit && offset){
    res.json({
      limit,
      offset
    });
  }else{
    res.json({
      state:"There is any object!"
    });
  }
});

//To show all users
app.get('/users',(req,res)=>{
  res.json([{
    name: "second route",
    lastname: "other part"
  },
  {
    name: "Brian2",
    lastname: "Crack"
  }]);
});



//To show an specific user
app.get("/users/:id",(req,res)=>{
  const { id } = req.params;
  //res.send("This is the id --");
  res.json({
    id,
    name:"Brian",
    lastname: "Crack"
  });
});

//To show what is the port using in the app.
app.listen(port,()=>{
  console.log("This is working!");
});
