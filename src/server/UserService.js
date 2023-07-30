import db from "../models/index"
import bcrypt from 'bcryptjs'

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
                        userData.message = `Wrong password`
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

module.exports = {
    handleUserLogin,
    checkUserMail
}