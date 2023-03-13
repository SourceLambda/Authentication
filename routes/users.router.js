const express = require("express");
const UserService = require("./../services/user.service");
const validatorHandler = require("./../middlewares/validator.handler");
const {createUserSchema,updateUserSchema,getUserSchema} = require("./../schemas/user.schema");

const router = express.Router();
const service = new UserService();

//To show random users
router.get("/",(req,res)=>{
  const users = service.find();
  //const { size } = req.query;
  res.json(users);
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
  if (id==='999'){
    res.status(404).json({
      message:"not found!"
    });
  }else{
    res.status(200).json({
      name: "Picked up User",
      email: "email@",
      id: id
    });
  }
});

//To show an specific user. With services
router.get("/4/:id",
validatorHandler(getUserSchema,"params"),
(req,res,next)=>{
  try {
    const { id } = req.params;
    const user = service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error)
  }

});

//To show what a client send me
router.post("/",(req,res)=>{
  const body = req.body;
  const newUser = service.create(body);
  // res.json({
  //   message: "Was completed!",
  //   your_data: body
  // });
  res.status(201).json(newUser);
});

router.put("/:id",(req,res)=>{
  const {id} = req.params;
  res.status(201).json({
    message: "You just updated!",
    id: id
  });
});

router.patch("/:id",(req,res)=>{
  const {id} = req.params;
  const body =req.body;
  // res.json({
  //   message: "You just updated in the second way!",
  //   id: id
  // });
  const updatedUser = service.update(id,body);
  res.json(updatedUser);

});

router.delete("/:id",(req,res)=>{
  const {id} = req.params;
  // res.json({
  //   message: "You just deleted!",
  //   id: id
  // });
  const reply = service.delete(id);
  res.json(reply);
});

module.exports = router;
