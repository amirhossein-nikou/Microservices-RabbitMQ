const jwt = require("jsonwebtoken")
function isAuthenticated(req, res, next) {
    try {
        const token = req.headers?.["authorization"]?.split(" ")[1]
        jwt.verify(token, "secret", {}, (error, payload) => {
            if (error) next(error)
            req.user = payload
            next()
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    isAuthenticated
}