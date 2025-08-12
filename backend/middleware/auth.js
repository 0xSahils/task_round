import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token (using 'id' not 'userId')
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.log("Auth middleware error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
