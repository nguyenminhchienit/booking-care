import db from "../models/index"
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email,password) => {
    return new Promise ( async (resolve,reject) => {
        try {
            let userData = {}
            let isExistEmail = await checkUserMail(email);
            if(isExistEmail){ // neu email ton tai
                //Compare password
                let user = await db.User.findOne({
                    attributes: ["email", "roleId", "password"],
                    where: {email: email},
                    raw: true
                })
                if(user){
                    let check = bcrypt.compareSync(password, user.password);
                    if(check){
                        userData.errCode = 0;
                        userData.message = "OK";

                        delete user.password
                        userData.user = user 

                    }else{
                        userData.errCode = 3;
                        userData.message = `Wrong password and email`
                    }

                }else{
                    userData.errCode = 2;
                    userData.message = `User's not found!`
                }
               
            }else{
                userData.errCode = 1;
                userData.message = `Email isn't exist in system. Please try other email.`
            }            
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserMail = (userMail) => {
    return new Promise( async (resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where: {email: userMail}
            })

            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
            
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise( async (resolve,reject) => {
        try {
            let users = '';
            if(userId === "ALL"){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if(userId && userId !== "ALL"){
                users = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
            
        } catch (e) {
            reject(e);  
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise( async (resolve,reject) => {
        try {
            
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }
    }) 
}

let createNewUser = (data) => {
    return new Promise( async (resolve,reject) => {
        try {
            let check = await checkUserMail(data.email);
            if(check === true){
                resolve({
                    errCode: 1,
                    message: "Your is email already used. Please try another email!"
                })
            } else{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === "1" ? true : false,
                    //image: data.image,
                    roleId: data.roleId,
                    //positionId: data.positionId,
                })
                resolve({
                    errCode: 0,
                    message: "OK"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise( async (resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                },
                raw: false
            })
            if(!user){
                resolve({
                    errCode: 2,
                    message: "The user isn't exist!"
                })
            }

            user.destroy().then(function(){
                resolve({
                    errCode: 0,
                    message: "OK"
                })
            });
        } catch (e) {
            reject(e)
        }
    })
}

let updateUser = (data) => {
    return new Promise ( async (resolve,reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    message: "Missing id params"
                })
            }
            let user = await db.User.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })

            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                resolve({
                    errCode: 0,
                    message: "OK"
                })
            }else{
                resolve({
                    errCode: 1,
                    message: "User's not found"
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin,
    checkUserMail,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser
}