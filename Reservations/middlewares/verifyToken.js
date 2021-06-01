const jwt = require("jsonwebtoken");
const config = require("../config/configurations");

module.exports = function (req, res, next) {
  if (typeof req.headers.authorization !== "string") {
    res.status(config.statusCodes.UNAUTHORIZED);
    res.json({ success: false, error: "Access denied" });
    return;
  }
  try {
    const token = req.headers.authorization.split(" ");
    if (token[0] === "Bearer" && jwt.verify(token[1], config.tokenSecret))
      next();
  } catch (e) {
    res.status(config.statusCodes.UNAUTHORIZED);
    res.json({ success: false, error: "Access denied" });
  }
};
