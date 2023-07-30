import db from "../models/index";
import UserService from "../server/UserService"

let handleLogin = async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: "Miss params"
        })
    }

    let userData = await UserService.handleUserLogin(email,password);

    return res.status(200).json({
            errCode: userData.errCode,
            message: userData.message,
            user: userData.user ? userData.user : {}
    })
}

module.exports = {
    handleLogin
}