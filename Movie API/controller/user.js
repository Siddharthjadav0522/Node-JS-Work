const User = require("../model/user");

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

    if (findUser && findUser.username === username) {
        if (findUser.password === password) {
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
    res.json({
        msg: "user logout Successfully"
    })
};

module.exports = { register, login, logout };
