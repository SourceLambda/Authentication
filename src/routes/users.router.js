const express = require("express");
const UserService = require("./../services/user.service");
const validatorHandler = require("./../middlewares/validator.handler");
const {createUserSchema,updateUserSchema,getUserSchema} = require("./../schemas/user.schema");
const passport = require("passport");

const router = express.Router();
const service = new UserService();

//To show users
router.get("/",
passport.authenticate("jwt",{session: false}),
  async(req,res,next)=>{
    try {
      const users = await service.find();
      //const { size } = req.query;
      res.json(users);
    } catch (error) {
      next(error);
    }
});

//To show users
router.get("/_",
  async(req,res,next)=>{
    try {
      const users = await service.find();
      //const { size } = req.query;
      res.json(users);
    } catch (error) {
      next(error);
    }
});


//To test login
router.get("/test1",
  passport.authenticate("jwt",{session: false}), // False: not using cookies
  async(req,res,next)=>{
    try {
      //const users = await service.find();
      //const { size } = req.query;
      await res.send("You have access to Test1");
    } catch (error) {
      next(error);
    }
});

//To test login
router.get("/test2",
  passport.authenticate("jwt",{session: false}), // False: not using cookies
  async(req,res,next)=>{
    try {
      //const users = await service.find();
      //const { size } = req.query;
      await res.send("You have access to Test2");
    } catch (error) {
      next(error);
    }
});


//To create users
router.post("/",
  validatorHandler(createUserSchema,"body"),
  async (req,res,next)=>{
    try {
      const body = req.body;
      const newUser = await service.create(body);
      // res.json({
      //   message: "Was completed!",
      //   your_data: body
      // });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }

});

//To recover password
router.post("/recovery",
  //passport.authenticate("jwt",{session: false}),
  validatorHandler(updateUserSchema,"body"),
  async (req,res,next)=>{
    try {
      const body = req.body;
      const newPassword = await service.update(body.email,body.password);
      // res.json({
      //   message: "Was completed!",
      //   your_data: body
      // });
      res.status(201).json(newPassword);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
