const photoController = require("../controllers/photo.controller");
const { uploadImage } = require("../common/uploadimg");
const { auth } = require("../middleware/authentication/auth");
const router = require("express").Router();

router.post("/addPhoto",auth, uploadImage("path"), photoController.addPhoto);
router.post("/up", auth, photoController.up);
router.post("/down", auth, photoController.down);
router.get("/", auth,photoController.getPhotos);

module.exports = router;
