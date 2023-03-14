const jwt = require("jsonwebtoken");

const secret = "unal";
const payload = {
  sub:1,
  role:'customerf'
}

function singToken(payload,secret){
  return jwt.sign(payload,secret);
}

const token = singToken(payload,secret);
console.log(token);
