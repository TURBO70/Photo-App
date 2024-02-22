const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

module.exports.uploadImage = (filename) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      const newFileName = uuidv4() + "-" + file.originalname;
      console.log("New file name:", newFileName);
      cb(null, newFileName);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }

  const upload = multer({ storage, fileFilter });

  return (req, res, next) => {
    upload.single(filename)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.error("Multer Error:", err);
        return res.status(400).send("Multer Error: " + err.message);
      } else if (err) {
        console.error("Unknown Error:", err);
        return res.status(500).send("Unknown Error: " + err.message);
      }

      next();
    });
  };
};
