const usersRouter = require("./users.router");
const authRouter = require("./auth.router");
const express = require("express");

//app is parameter right here, it is not an argument. The argument appears in the main index.js in the root directory
function routerApi(app){
  const router = express.Router();
  app.use("/api/v1",router);
  router.use("/users",usersRouter);
  router.use("/auth",authRouter);
}

module.exports = routerApi;
