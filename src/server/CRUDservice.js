import bcrypt from 'bcryptjs'
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    return new Promise( async (resolve,reject) => {
        try {
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
            resolve("Create new user success")

        } catch (e) {
            reject(e)
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

let getAllUser = () => {
    return new Promise( async (resolve,reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            resolve(users)
            
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoByID = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let userData = await db.User.findOne({
                where: {id: userId},
                raw: true
            })
            if(userData){
                resolve(userData)
            }else{
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise( async (resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save()
                resolve()
            }else{
                resolve();
            }
        } catch (e) {
            reject(e);
        } 
    })
}

let deleteUserByID = (userId) => {
    return new Promise( async (resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(user){
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser,
    hashUserPassword,
    getAllUser,
    getUserInfoByID,
    updateUserData,
    deleteUserByID
}