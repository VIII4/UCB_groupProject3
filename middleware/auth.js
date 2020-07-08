const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res
                .sendStatus(401)
                .json({
                    msg: "No token, denied"
                })

        const verified = jwt.verify(token, "askdjfhsejhkgfjshk");
        if (!verified)
            return res
                .sendStatus(401)
                .json({
                    msg: "Bad token, denied"
                })
        req.user = verified.id ;
        next() ;
    } catch (err) {

        res.sendStatus(500).json({
            error: err.message
        });

    }
} ;

module.exports = auth ;