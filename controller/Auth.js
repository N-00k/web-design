const passport = require("passport");
const { User } = require("../model/User");
const crypto = require('crypto');
const password = require("password");
const { sanitizeUser } = require("../services/common");
// const SECTRET_KEY = 'SECTRET_KEY';

const jwt = require('jsonwebtoken');
const { json } = require("stream/consumers");

exports.createauth = async (req, res) => {
    ////this user we have to get from API body
    // console.log(req.body);

    // console.log(user);
    try {


        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password,
            salt,
            310000,
            32,
            'sha256',

            async function (err, hashedPassword) {
                const user = new User({ ...req.body, password: hashedPassword, salt })
                const doc = await user.save();
                req.login(sanitizeUser(doc), (err) => {
                    if (err) {
                        res.status(400).json(err);
                    }
                    else {
                        const token = jwt.sign(sanitizeUser(doc), process.env.JWT_SECRET_KEY);
                        res.cookie('jwt', token, {
                            expires: new Date(Date.now() + 3600000),
                            httpOnly: true
                        });
                        res.json({ id: doc.id, role: doc.role });
                    }


                })
            })

    } catch (err) {
        res.status(400).json(err);
    }
};


exports.loginUser = async (req, res) => {
    const user = req.user
    console.log("Login", user);


    res.cookie('jwt', req.user.token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true
    });
    res.status(201)
    res.json({ id: user.id, role: user.role })
}

exports.checkAuth = async (req, res) => {
    // console.log("sdfasdfa", req.user);

    if (req.user) {
        res.json(req.user)
    } else {
        res.sendStatus(401)
    }

}
