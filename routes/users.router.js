const express = require("express");
const router = express.Router();

//To show all users in a different way, by parameters
router.get("/1",(req,res)=>{
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
router.get('/2',(req,res)=>{
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
router.get("/3/:id",(req,res)=>{
  const { id } = req.params;
  //res.send("This is the id --");
  res.json({
    id,
    name:"Brian",
    lastname: "Crack"
  });
});

module.exports = router;
