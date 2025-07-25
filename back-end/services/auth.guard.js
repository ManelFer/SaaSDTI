import jwt from "jsonwebtoken";

const validateToken = (authHeader) => {
  if (!authHeader) {
    return false;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return !!decoded;
  } catch (error) {
    return false;
  }
};

export default validateToken;


