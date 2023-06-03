//Right here is placed the setup about sequilize with the models
const { User, UserSchema } = require('./user.model');
//More models should be placed here If I created new models

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  //More configurations should be placed here If I imported new models
}

module.exports = setupModels;
