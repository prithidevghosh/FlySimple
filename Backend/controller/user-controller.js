const USER = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports.CREATEUSER = async (req, res) => {
    console.log(req.body);
    try {
        const userFetchedDb = await USER.findOne({ email: req.body.email });
        if (userFetchedDb) {
            return res.status(400).json({
                message: "user already registered , please login"
            })
        } else {
            //admin 
            if (req.body.password == req.body.confirmPassword) {
                const saltRounds = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
                const newUser = new USER({
                    email: req.body.email,
                    password: hashPassword
                })
                const result = await newUser.save();
                const { password, ...data } = newUser.toObject();
                return res.status(200).json({
                    message: "user created",
                    data: data
                })
            } else {
                return res.status(400).json({
                    message: "password and confirm password not matching"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: `error caught in catch block while creating user, error is ${error}`
        })
    }
}

module.exports.createSession = async (req, res) => {
    try {
        const userFetchedDb = await USER.findOne({ email: req.body.email });
        if (userFetchedDb) {
            let pass_compare = await bcrypt.compare(req.body.password, userFetchedDb.password);
            if (pass_compare) {
                req.session.userId = userFetchedDb._id;
                return res.status(200).json({
                    message: "session created successfully",
                    user: userFetchedDb.email,
                    token: jwt.sign(userFetchedDb.toJSON(), process.env.JWT_SECRET_KEY, { expiresIn: 500000 })
                })
            } else {
                return res.status(400).json({
                    message: "wrong password , please recheck"
                })
            }
        } else {
            return res.status(400).json({
                message: "user not registered in db"
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: `error in catch block while creating session, error is ${error}`
        })
    }
}

module.exports.deleteSession = function (req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded._id;

    const sessionStore = req.sessionStore;

    sessionStore.all((err, sessions) => {
        if (err) {
            console.log(err);
        }
        else {
            for (let i = 0; i < sessions.length; i++) {
                const session = sessions[i];
                console.log(session.userId);
                if (session.userId === userId) {
                    // Destroy the session
                    sessionStore.destroy(session.id, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            }
        }
    })
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {

            return res.status(200).json({
                message: "session successfully destroyed"
            })
        }
    });
}

