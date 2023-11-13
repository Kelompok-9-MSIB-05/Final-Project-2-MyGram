const router = require("express").Router()

const userRoutes = require("./UserRoutes")
const socialMediaRoutes = require("./SocialMediaRoutes")


router.use("/users", userRoutes)
router.use("/socialmedias", socialMediaRoutes)
router.use('/photos', photoRoutes);
router.use('/comments', commentRoutes);

module.exports = router;