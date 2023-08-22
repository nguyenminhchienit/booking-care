import db from "../models/index";
require('dotenv').config()
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import EmailService from './EmailService'

let buildUrlVerifyMail = (doctorId,token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result
}
let handlePostAppointmentService = (data) => {
    return new Promise( async (resolve,reject) => {
        try {
            if(!data.email || !data.doctorId || !data.timeType || !data.date){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{

                let token = uuidv4();

                await EmailService.sendEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    doctorName: data.doctorName,
                    redirectLink: buildUrlVerifyMail(data.doctorId,token),
                    time: data.timeString
                })
                //upsert ( insert/update)
                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email
                    },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                })
                //console.log("check user: ",user[0])
                if(user && user[0]){
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    message: "Save patient succeed",
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}


let postVerifyBookAppointmentService = (data) => {
    return new Promise( async (resolve,reject) => {
        try {
            if(!data.doctorId || !data.token){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{
                let appointment = await db.Booking.findOne({
                    where:{
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if(appointment){
                    appointment.statusId = 'S2'
                    await appointment.save();

                    resolve({
                        errCode: 0,
                        message: "Update the appointment succeed!"
                    })
                }else{
                    resolve({
                        errCode: 2,
                        message: "Update the appointment failed!"
                    })
                }

            }
            
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handlePostAppointmentService,
    postVerifyBookAppointmentService
}