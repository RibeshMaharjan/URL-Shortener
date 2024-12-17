// const sessionIdToUserMap = new Map();
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

function setUser(user) {
  const payload = {
    ...user
  }

  return jwt.sign(payload, secretKey);
}

function getUser(token) {

  if (!token) return null;

  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}

export default {
  setUser,
  getUser
}