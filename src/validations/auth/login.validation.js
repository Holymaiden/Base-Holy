const joi = require("joi");
const Response = require("../../utils/response.util");

const validation = joi.object({
  username: joi.string().required(),
  password: joi.string().min(5).required(),
});

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {NextFunction}
 */

const Validate = (req, res, next) => {
  try {
    const Result = validation.validate({
      username: req.body.username,
      password: req.body.password,
    });

    if (Result.error) {
      return res
        .status(405)
        .json({
          message: Result.error.message,
        })
        .end();
    } else {
      return next();
    }
  } catch (error) {
    return Response.error(res, error.message);
  }
};

module.exports = Validate;
