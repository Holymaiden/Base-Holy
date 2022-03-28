const { getOneAuth } = require("../../models/auth.model");
const Respone = require("../../utils/response.util");
const { comparePassword } = require("../../helpers/hashPassword.helper");
const generateAccessToken = require("../../helpers/generateAccessToken.helper");

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 * login user
 */

const Login = async (req, res) => {
  let data = req.body;
  try {
    let result = await getOneAuth(data.username);
    if (result) {
      if (await comparePassword(data.password, result.password)) {
        delete result.password;

        const accessToken = await generateAccessToken(result);

        return Respone.success(res, { token: accessToken, id: result.id });
      }
      return Respone.error(res, "Password is incorrect");
    }
    return Respone.notFound(res, "Username is incorrect");
  } catch (error) {
    return Respone.error(res, error.message);
  }
};

module.exports = { Login };
