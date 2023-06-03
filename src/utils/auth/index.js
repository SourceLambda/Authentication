const passport = require("passport");

//I could set up more strategies right here. For example, strategies with regard to Twitter
const LocalStrategy = require("./strategies/local.strategy");
const JwtStrategy = require("./strategies/jwt.strategy");

passport.use(LocalStrategy);
passport.use(JwtStrategy);
