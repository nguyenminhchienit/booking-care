import db from "../models/index";
require('dotenv').config()
import _ from 'lodash'
import EmailService from './EmailService'

let handlePostAppointmentService = (data) => {
    return new Promise( async (resolve,reject) => {
        try {
            if(!data.email || !data.doctorId || !data.timeType || !data.date){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{

                await EmailService.sendEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    doctorName: data.doctorName,
                    redirectLink: "https://sinhvien.hutech.edu.vn/#/sinhvien/login/login",
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
                            timeType: data.timeType
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

module.exports = {
    handlePostAppointmentService
}