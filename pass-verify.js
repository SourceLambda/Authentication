const bcrypt = require("bcrypt");

async function verifyPassword(){
  const password = "124kajsdf";
  const hash = "$2b$10$v1QW1gV6uAZMUhORikDT9O1ph/bdF40qiDCdnZLCgEVb3bPcC2Kea"
  const isMatch = await bcrypt.compare(password,hash);
  //This is the value I have to save in the database
  console.log(isMatch);
  console.log("working!");
}

verifyPassword();
