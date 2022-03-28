const moment = require("moment-timezone");

/**
 *
 * @returns {String}
 */

const getDate = () => {
  return moment().tz("Asia/Makassar").format("YYYY-MM-DD");
};

const newDate = () => {
  return moment().tz("Asia/Makassar").format("YYYY-MM-DD HH:mm:ss");
};

/**
 *
 * @returns {BigInteger}
 */

const getDay = () => {
  return moment().tz("Asia/Makassar").get("day") - 1;
};

module.exports = { getDate, getDay, newDate };
