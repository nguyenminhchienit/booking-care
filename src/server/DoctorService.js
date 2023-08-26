import db from "../models/index";
require('dotenv').config()
import _ from 'lodash'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE

let getDoctor = (limit) => {
    return new Promise( async (resolve,reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: {roleId: 'R2'},
                order: [['createdAt','DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEN','valueVI'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEN','valueVI'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                message: "Get doctor success",
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getAllDoctor = () => {
    return new Promise ( async (resolve,reject) => {
        try {
            let doctor = await db.User.findAll({
                where: {
                    roleId: "R2",
                },
                attributes: {
                    exclude: ['password','image']
                },
            })
            resolve({
                errCode: 0,
                message: "Get all doctor success",
                data: doctor
            })
            
        } catch (e) {
            reject(e)
        }
    })
}

let postInfoDoctorService = (dataInput) => {
    return new Promise ( async (resolve, reject) => {
        try {
            if(!dataInput.doctorId || !dataInput.contentHTML || !dataInput.contentMarkdown || !dataInput.action
               || !dataInput.description || !dataInput.selectedPrice || !dataInput.selectedProvince 
               || !dataInput.selectedPayment || !dataInput.addressClinic || !dataInput.nameClinic || !dataInput.note
               || !dataInput.specialtyId || !dataInput.clinicId){
                resolve({
                    errCode: 1,
                    message: `Missing params`
                })
            }else{
                if(dataInput.action == 'CREATE'){
                    await db.Markdown.create({
                        contentHTML: dataInput.contentHTML,
                        contentMarkdown: dataInput.contentMarkdown,
                        description: dataInput.description,
                        doctorId: dataInput.doctorId
                    })
                }else if (dataInput.action === 'EDIT'){
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: {
                            doctorId: dataInput.doctorId
                        },
                        raw: false
                    })
                    if(doctorMarkdown){
                        doctorMarkdown.contentHTML= dataInput.contentHTML;
                        doctorMarkdown.contentMarkdown= dataInput.contentMarkdown;
                        doctorMarkdown.description= dataInput.description;
                        await doctorMarkdown.save()
                    }
                }

                //save doctor info table
                let doctorInfo = await db.DoctorInfo.findOne({
                    where: {
                        doctorId: dataInput.doctorId,
                    },
                    raw: false
                })

                if(doctorInfo){ // if have been => update
                    doctorInfo.priceId= dataInput.selectedPrice;
                    doctorInfo.provinceId= dataInput.selectedProvince;
                    doctorInfo.paymentId= dataInput.selectedPayment;
                    doctorInfo.addressClinic= dataInput.addressClinic;
                    doctorInfo.nameClinic= dataInput.nameClinic;
                    doctorInfo.note= dataInput.note;
                    doctorInfo.specialtyId = dataInput.specialtyId;
                    doctorInfo.clinicId = dataInput.clinicId
                    await doctorInfo.save()
                }else{ // if haven't been => create
                    await db.DoctorInfo.create({
                        doctorId: dataInput.doctorId,
                        priceId: dataInput.selectedPrice,
                        provinceId: dataInput.selectedProvince,
                        paymentId: dataInput.selectedPayment,
                        addressClinic: dataInput.addressClinic,
                        nameClinic: dataInput.nameClinic,
                        note: dataInput.note,
                        specialtyId: dataInput.specialtyId,
                        clinicId: dataInput.clinicId
                    })
                }
                resolve({
                    errCode: 0,
                    message: "Save info doctor success"
                })
            }
            
        } catch (e) {
            reject(e)
            
        }
    })
}

let getDetailDoctorById = (inputId) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!inputId){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{
                
                    let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Markdown, attributes: ['description','contentHTML', 'contentMarkdown'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEN','valueVI'] },
                        { 
                            model: db.DoctorInfo,
                            attributes:{
                                exclude: ['doctorId', 'id']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEN','valueVI'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEN','valueVI'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEN','valueVI'] },
                            ]
                        }                       
                    ],
                    raw: true,
                    nest: true
                })
                if(!data){
                    data = {}
                }
                if(data && data.image){
                    data.image = new Buffer (data.image, 'base64').toString('binary')
                }
                resolve({
                    errCode: 0,
                    message: "Get info doctor succeed",
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let bulkCreateScheduleService = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!data.arrSchedule || !data.doctorId || !data.formatDate){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{
                let schedule = data.arrSchedule;
                if(schedule && schedule.length > 0){
                    schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE
                        return item;
                    })
                }
                // console.log(schedule)
                

                let existing = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: data.formatDate
                    },
                    attributes: ['doctorId','maxNumber','timeType','date'],
                    raw: true
                })

                if(existing && existing.length > 0){
                    existing.map((item) => {
                        item.date = Number(item.date)
                        return item
                    })
                }

                let newSchedule = _.differenceWith(schedule,existing,(a,b) => {
                    return a.timeType === b.timeType && a.date === b.date
                }) 

                // console.log("New Schedule", newSchedule)

                if(newSchedule && newSchedule.length > 0){
                    await db.Schedule.bulkCreate(newSchedule)
                }

                resolve({
                    errCode: 0, 
                    message: "OK",
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

let getScheduleDoctorService = (date,doctorId) => {
    return new Promise( async (resolve,reject) => {
        try {
            if(!doctorId || !date){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{
                let data = await db.Schedule.findAll({
                    where:{
                        date: date,
                        doctorId: doctorId
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEN','valueVI'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstName','lastName'] },
                    ],
                    nest: true,
                    raw: false
                })

                if(!data) data = []
                resolve({
                    errCode: 0,
                    message:"OK",
                    data: data
                })
            }
            
        } catch (e) {
            reject(e);
        }
    })
}

let getExtraDoctorInfoService = (inputId) => {
    return new Promise ( async (resolve,reject) => {
        try {
            if(!inputId){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{
                let data = await db.DoctorInfo.findOne({
                    where: {
                        doctorId: inputId
                    },
                    attributes:{
                        exclude: ['doctorId', 'id']
                    },
                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEN','valueVI'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEN','valueVI'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEN','valueVI'] },
                    ],
                    nest: true,
                    raw: false
                })
                if(!data) data = []
                resolve({
                    errCode: 0,
                    message:"OK",
                    data: data
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

let getProfileDoctorByIdService = (inputId) => {
    return new Promise ( async (resolve,reject) => {
        try {
            if(!inputId){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Markdown, attributes: ['description'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEN','valueVI'] },
                        { 
                            model: db.DoctorInfo,
                            attributes:{
                                exclude: ['doctorId', 'id']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEN','valueVI'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEN','valueVI'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEN','valueVI'] },
                            ]
                        }                       
                    ],
                    raw: true,
                    nest: true
                })
                if(!data){
                    data = {}
                }
                if(data && data.image){
                    data.image = new Buffer (data.image, 'base64').toString('binary')
                }
                resolve({
                    errCode: 0,
                    message: "Get info doctor succeed",
                    data: data
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getDoctor,
    getAllDoctor,
    postInfoDoctorService,
    getDetailDoctorById,
    bulkCreateScheduleService,
    getScheduleDoctorService,
    getExtraDoctorInfoService,
    getProfileDoctorByIdService
}