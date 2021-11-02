'use strict';

exports.validateUser = async (req, res, next) => {
    if (req.body.role === "ADMIN") {
        next();
    } else {
        res.status(401).json({ error: "Invalid user" });
    }
}