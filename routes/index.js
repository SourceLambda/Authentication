const usersRouter = require("./users.router");

//app is parameter right here, it is not an argument. The argument appears in the main index.js in the root directory
function routerApi(app){
  app.use("/users",usersRouter);
}

module.exports = routerApi;
