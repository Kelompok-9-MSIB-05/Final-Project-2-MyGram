const router = require("express").Router()

const userRoutes = require("./UserRoutes")
const socialMediaRoutes = require("./SocialMediaRoutes")


router.use("/users", userRoutes)
router.use("/socialmedias", socialMediaRoutes)

module.exports = router