const jwt = require("jsonwebtoken");

const secret = "unal";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lcmYiLCJpYXQiOjE2Nzg3NzczMjl9.p8uZdOBRZ0uOD7ANuKyRIcLfhOVcIBfZoqBi1Ctv0Nw";

function verifyToken(token,secret){
  return jwt.verify(token,secret);
}

const payload = verifyToken(token,secret);
console.log(payload);
