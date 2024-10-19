const jwt = require("jsonwebtoken");
// const env = require("dotenv");

const authSession = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({
            msg: "you can first login"
        })
    }
}

const tokenAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        req.token = token;
        const validToken = jwt.verify(token, process.env.JWTSECRET_KEY);
        req.user = validToken;
        if (validToken) {
            return next();
        } else {
            return res.status(401).json({
                msg: "you can first login"
            })
        }
    } catch (error) {
        res.status(401).json({
            msg: "token is not valide"
        });
    }
}

module.exports = { authSession, tokenAuth };