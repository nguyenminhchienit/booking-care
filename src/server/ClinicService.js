import db from "../models/index";
require('dotenv').config()
import _ from 'lodash'

let postCreateNewClinicService = (data) => {
    return new Promise ( async (resolve,reject) => {
        try {
            if(!data.nameClinic || !data.imageBase64 || !data.desHTML 
                || !data.desMarkdown || !data.address){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{
                await db.Clinic.create({
                    name: data.nameClinic,
                    image: data.imageBase64,
                    descHTML: data.desHTML,
                    descMarkdown: data.desMarkdown,
                    address: data.address
                })
                resolve({
                    errCode: 0,
                    message: "Save clinic succeed!",
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postCreateNewClinicService
}