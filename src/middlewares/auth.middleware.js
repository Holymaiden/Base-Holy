const jwt = require("jsonwebtoken");
const Response = require("../utils/response.util");

/**
 * @author M. Fiqri Haikhar Anwar
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * middleware for check authentication
 */
async function authAdminMiddleware(req, res, next) {
  let auth = await authMiddleware("admin", req, res);
  if (auth.authorized) {
    return next();
  } else {
    return Response.unauthorized(res);
  }
}

async function authUserMiddleware(req, res, next) {
  let auth = await authMiddleware("user", req, res);
  if (auth.authorized) {
    return next();
  } else {
    return Response.unauthorized(res);
  }
}

async function authMiddleware(role, req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null || token == " ") {
    return Response.unauthorized(res, "Please Provide Token");
  }

  return jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
    if (err) {
      return Response.unauthorized(res, "invalid token");
    }

    let authorized = false;

    if (decode.data.role == role) {
      authorized = true;
    }

    return (data = { authorized: authorized, user: decode.data });
  });
}

async function getUser(req, res) {
  let auth = await authMiddleware("default", req, res);
  return auth.user;
}

module.exports = {
  authAdminMiddleware,
  authUserMiddleware,
  getUser,
};
