'use strict';

const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.generateJwtToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.jwtToken = decode;
        next();
    } catch (err) {
        res.status(401).json({ error: "" });
    }
}