const { Sequelize, Model, DataTypes } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password:{
    allowNull: false,
    type: DataTypes.STRING
  },
  role:{
    allowNull: true,
    type: DataTypes.STRING
  }
}

class User extends Model {
  //It's defined static not to declare an object of this class to use the methods
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User }
