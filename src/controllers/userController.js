import db from "../models/index";
import UserService from "../server/UserService"

let handleLogin = async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: "Please enter email and password!"
        })
    }

    let userData = await UserService.handleUserLogin(email,password);

    return res.status(200).json({
            errCode: userData.errCode,
            message: userData.message,
            user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req,res) => {
    let id = req.query.id;
    let users = await UserService.getAllUsers(id)

    if(!id){
        return res.status(500).json({
            errCode: 1,
            message: "Missing params",
            users: []
        })
    }

    return res.status(200).json({
        errCode: 0,
        message: "OK",
        users
    })
}

let handleCreateNewUser = async (req,res) => {
    let data = req.body;
    let message = await UserService.createNewUser(data)
    console.log(message)

    return res.status(200).json(message)
}

let handleDeleteUser = async (req,res) => {
    let id = req.body.id;
    if(!id){
        return res.status(500).json({
            errCode: 1,
            message: "Missing params!!"
        })
    }
    let message = await UserService.deleteUser(id)
    return res.status(200).json(message)
}

let handleEditUser = async (req,res) => {
    let data = req.body;
    let message = await UserService.updateUser(data);
    return res.status(200).json(message)
}

module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser
}