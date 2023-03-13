const express = require("express");
const faker = require("faker");
const router = express.Router();


//To show random users
router.get("/",(req,res)=>{
  const data = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    data.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.imageUrl()
    });
  }
  res.json(data);
});

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

//To show what a client send me
router.post("/",(req,res)=>{
  const body = req.body;
  res.json({
    message: "Was completed!",
    your_data: body
  });
});

router.put("/:id",(req,res)=>{
  const {id} = req.params;
  res.json({
    message: "You just updated!",
    id: id
  });
});

router.patch("/:id",(req,res)=>{
  const {id} = req.params;
  res.json({
    message: "You just updated in the second way!",
    id: id
  });
});

router.delete("/:id",(req,res)=>{
  const {id} = req.params;
  res.json({
    message: "You just deleted!",
    id: id
  });
});

module.exports = router;
