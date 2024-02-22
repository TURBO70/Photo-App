const jwt = require("jsonwebtoken");

module.exports.auth = (req, res, next) => {
  try {
    let token = req.header("token");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized You have to login first." });
    }
    jwt.verify(token, "process.env.JWT1", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized You have to login first." });
      } else {
        req.id = decoded.userId;
        next();
      }
    });
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
