import db from "../models/index";
require('dotenv').config()
import _ from 'lodash'

let postCreateNewSpecialtyService = (data) => {
    return new Promise ( async (resolve,reject) => {
        try {
            if(!data.nameSpecialty || !data.imageBase64 || !data.desHTML || !data.desMarkdown){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{
                await db.Specialty.create({
                    name: data.nameSpecialty,
                    image: data.imageBase64,
                    desHTML: data.desHTML,
                    desMarkdown: data.desMarkdown
                })
                resolve({
                    errCode: 0,
                    message: "Save specialty succeed!",
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

let getAllSpecialtyService = () => {
    return new Promise ( async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
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

module.exports = {
    postCreateNewSpecialtyService,
    getAllSpecialtyService
}