const jwt = require("jsonwebtoken");
const SECRETKEY = "secretkey";

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, SECRETKEY, (err, authData) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        next();
      }
    });
  } else {
    return res.sendStatus(403);
  }
}

module.exports = verifyToken;
module.exports.SECRETKEY = SECRETKEY;
