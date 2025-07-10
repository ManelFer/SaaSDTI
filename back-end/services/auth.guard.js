import jwt from "jsonwebtoken";

const validateToken = (token) => {
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


