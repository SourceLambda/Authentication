const passport = require("passport");

const LocalStrategy = require("./strategies/local.strategy");
//const LocalStrategy = jwt;
//const LocalStrategy = twitter;
passport.use(LocalStrategy);
