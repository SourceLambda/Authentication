const passport = require("passport");

const LocalStrategy = require("./strategies/local.strategy");
const JwtStrategy = require("./strategies/jwt.strategy");
//const LocalStrategy = jwt;
//const LocalStrategy = twitter;
passport.use(LocalStrategy);
passport.use(JwtStrategy);
