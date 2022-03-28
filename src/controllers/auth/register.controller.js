const { registerAuth, getOneAuth } = require("../../models/auth.model");
const Respone = require("../../utils/response.util");
const { hashingPassword } = require("../../helpers/hashPassword.helper");
const genarateAccessToken = require("../../helpers/generateAccessToken.helper");

const register = async (req, res) => {
  let data = req.body;
  try {
    const user = await getOneAuth(data.username);

    if (user) {
      return Respone.duplicate(res, "User Sudah Terdaftar");
    }

    data.password = await hashingPassword(data.password);
    const result = await registerAuth(data);

    if (result) {
      const token = await genarateAccessToken(result);

      return Respone.success(res, { token: token, id: result });
    }

    return Respone.error(res, "Register failed");
  } catch (error) {
    return Respone.error(res, error.message);
  }
};

module.exports = { register };
