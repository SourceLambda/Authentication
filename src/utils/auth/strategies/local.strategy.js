const {Strategy} = require("passport-local");
const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");

const UserService = require("../../../services/user.service");

const ldap = require("ldapjs");

const service = new UserService();

const authenticateDN = (username, password) => {
  return new Promise((resolve, _ ) => {
    const client = ldap.createClient({
      url: ['ldap://172.30.0.1:389', 'ldap://172.30.0.1:636']
    });

    client.bind(username, password, (err) => {
      if (err) {
        console.log(`Error in new connection ${err}`);
        resolve(false);
      } else {
        console.log("Authentication with LDAP is a success!");
        resolve(true);
      }
    });
  });
};

const LocalStrategy = new Strategy({
    usernameField:"email",
    passwordField: "password"
  },
  async (email, password, done)=>{
    try {
      const user = await service.findByEmail(email);

      if (!user) {
        done(boom.unauthorized(),false);
      }

      const isMatch = await bcrypt.compare(password,user.password);

      if(!isMatch){
        done(boom.unauthorized("Password didn't match in the first part of Authentication"),false);
      }

      //"arqsoft.unal.edu.co"
      //cn=bchaparro@unal.edu.co,ou=sa,dc=arqsoft,dc=unal,dc=edu,dc=co
      //authenticateDN("cn=admin,dc=arqsoft,dc=unal,dc=edu,dc=co","admin");
      const ldapRespose = await authenticateDN(`cn=${email},ou=sa,dc=arqsoft,dc=unal,dc=edu,dc=co`,`${password}`);

      if(!ldapRespose){
        done(boom.unauthorized("LDAP authentication failed, but it worked in the first part of Authentication"),false);
      }

      delete user.password;
      done(null, user);
    } catch (error) {
      done(error,false);
    }
});




module.exports = LocalStrategy;
