import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Generate a token
export const generateToken = (doctor) => {
  return jwt.sign({ id: doctor._id }, JWT_SECRET, { expiresIn: "1h" });
};

// Verify token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
