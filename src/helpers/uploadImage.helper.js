const multer = require("multer");
const path = require("path");
const { newDate } = require("../utils/date.util");

/**
 *
 * @param {Object} file
 * @param {Function} cb
 * @returns {CallBack}
 */

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /pdf|png|jpeg|jpg|gif|svg/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Pdf, Png, Jpeg, Png, Svg or Gif Only!");
  }
}

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "avatar") {
      cb(null, "./public/avatars/");
    } else if (file.fieldname === "image") {
      cb(null, "./public/images/");
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + newDate() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
