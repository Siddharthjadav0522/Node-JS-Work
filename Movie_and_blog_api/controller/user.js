const sendOtp = require("../config/email_config");
const User = require("../model/user");

const otpStore = {};

const register = async (req, res) => {
    let { username, email, password, otp } = req.body;
    // console.log(otp);
    // console.log(otpStore.email.otp , "--" ,Date.now() - otpStore.email.time);

    if (!otpStore.email) {
        return res.status(400).json({ msg: "OTP not sent or expired" });
    }
    if (otpStore.email.otp !== otp && (Date.now() - otpStore.email.time >= 120000)) {
        return res.status(400).send("email verification fail");
    };
    delete otpStore.email;
    console.log(otpStore);
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
    let otp = Math.floor(1000 + Math.random() * 9000);

    otpStore.email = {
        otp: otp,
        time: Date.now()
    }
    console.log(otpStore);

    let html = `<p>This is your otp , it will expire in 2 minites</P>
    <h1>OTP : ${otp}</h1>
    <p>Thank you and best regards</p>
    `
    sendOtp(to, subject, html);
    res.send(`email send = ${otpStore.email.otp}`)
}

module.exports = { register, login, logout, otpVerifyEmail };
