// require("dotenv").config()
const jwt = require("jsonwebtoken")
const SECRET_KEY = "rahasia"

function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY)
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    generateToken,
    verifyToken
}