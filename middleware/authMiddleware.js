const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authorize = async (req, res, next) => {
  try {
    const ignorePaths = ["/ping", "/login", "/registerUser","/graphql"];
    if (ignorePaths.includes(req.path)) {
      return next();
    }
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({ message: "Token Not Found" });
    }
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(401).json({ message: "Not Authorized" });
  }
};

module.exports = { authorize };
