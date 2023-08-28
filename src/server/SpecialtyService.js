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

let getSpecialtyDoctorByIdService = (inputId, location) => {
    return new Promise( async (resolve,reject) => {
        try {
            if(!inputId || !location){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['desHTML','desMarkdown']
                })
                if(data){
                    let doctorSpecialty = []
                    if(location === 'ALL'){
                        doctorSpecialty = await db.DoctorInfo.findAll({
                            where: {
                                specialtyId: inputId
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }else{
                        doctorSpecialty = await db.DoctorInfo.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty
                }else{
                    data = {}
                }
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

const { Op } = require("sequelize");
let handleSearchService = (name) => {
    return new Promise ( async (resolve, reject) => {
        try {
            var options = {
                where: {
                    name: { [Op.like]: '%' + name + '%' },
                    // description: { [Op.like]: '%' + searchQuery2 + '%' }
                },
                attributes: ["name","id"]
              };
            let data = await db.Specialty.findAll(options);
            
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
    getAllSpecialtyService,
    getSpecialtyDoctorByIdService,
    handleSearchService
}