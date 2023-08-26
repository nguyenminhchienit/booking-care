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

let getAllClinicService = () => {
    return new Promise ( async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if(data && data.length > 0){
                data.map(item => {
                    if(item && item.image){
                        item.image = new Buffer (item.image, 'base64').toString('binary')
                    }
                })
            }
            resolve({
                errCode: 0,
                message: "Get specialty succeed!",
                data
            })
            
        } catch (e) {
            reject(e)
        }
    })
}

let getClinicDoctorByIdService = (inputId) => {
    return new Promise( async (resolve,reject) => {
        try {
            if(!inputId){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name','address','descHTML','descMarkdown','image']
                })
                
                if(data && data.image){
                    data.image = new Buffer (data.image, 'base64').toString('binary')
                }
                if(!data) data = {}
                
                resolve({
                    errCode: 0,
                    message: "Get specialty info succeed!",
                    data
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postCreateNewClinicService,
    getAllClinicService,
    getClinicDoctorByIdService
}