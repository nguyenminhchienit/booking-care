import db from "../models/index";

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
            if(!dataInput.doctorId || !dataInput.contentHTML || !dataInput.contentMarkdown){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{
                await db.Markdown.create({
                    contentHTML: dataInput.contentHTML,
                    contentMarkdown: dataInput.contentMarkdown,
                    description: dataInput.description,
                    doctorId: dataInput.doctorId
                })
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


module.exports = {
    getDoctor,
    getAllDoctor,
    postInfoDoctorService
}