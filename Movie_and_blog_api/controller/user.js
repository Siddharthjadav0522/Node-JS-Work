const sendOtp = require("../config/email_config");
const User = require("../model/user");

const otpStore = {};

const register = async (req, res) => {
    let { username, email, password } = req.body;
    let findUser = await User.findOne({ email });
    if (findUser) {
        res.status(409).json({
            msg: "user alredy exist"
        })
    } else {
        let user = await User.create({
            username, email, password
        });
        res.status(201).json(user);
    }
};
const login = async (req, res) => {
    let { username, email, password } = req.body;
    let findUser = await User.findOne({ email });
    let id = findUser._id;


    if (findUser && findUser.username === username) {
        if (findUser.password === password) {
            req.session.user = {
                id
            }
            res.status(200).json({
                msg: "User Login Successfully"
            })
        } else {
            res.json({
                msg: "password is Incorrect"
            })
        }
    } else {
        res.status(409).json({
            msg: "User not exist Please valide ditailes"
        })
    }
};

const logout = (req, res) => {
    req.session.destroy(function (err) {
        console.log("session destroy");
    })
    res.json({
        msg: "user logout Successfully"
    })
};

const otpVerifyEmail = async (req, res) => {
    let { email } = req.body;
    let to = email;
    let subject = "OTP from siddharth jadav";
    let otp = Math.floor(Math.random() * 10000 + 1);

    otpStore.email = {
        opt: otp,
        time: Date.now()
    }
    console.log(otpStore);

    let html = `<p>This is your otp , it will expire in 2 minites</P>
    <h1>OTP : ${otp}</h1>
    <p>Thank you and best regards</p>
    `
    sendOtp(to, subject, html);
    res.send("email send")
}

module.exports = { register, login, logout, otpVerifyEmail };
