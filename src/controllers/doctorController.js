import DoctorService from '../server/DoctorService'

let handleGetDoctor = async (req,res) => {
    try {
        let limit = req.query.limit;
        if(!limit){
            limit = 10;
        }
        let dataRes = await DoctorService.getDoctor(+limit)
        return res.status(200).json(dataRes)
        
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error"
        })
    }
} 

let handleGetAllDoctor = async (req,res) => {
    try {
        let resDoctor = await DoctorService.getAllDoctor();
        return res.status(200).json(resDoctor);
        
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server ..."
        })
        
    }
}

let handlePostInfoDoctor = async (req,res) => {
    try {
        let resPost = await DoctorService.postInfoDoctorService(req.body);
        return res.status(200).json(resPost)
        
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server ..."
        })
    }
}

let handleGetDoctorById = async (req,res) => {
    try {
        let doctorInfo = await DoctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(
            doctorInfo
        )
        
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server ..."
        })
    }
}

let bulkCreateSchedule = async (req,res) => {
    try {
        let info = await DoctorService.bulkCreateScheduleService(req.body);
        return res.status(200).json(
            info
        )
        
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server ..."
        })
    }
}

let getScheduleDoctor = async (req,res) => {
    try {
        let info = await DoctorService.getScheduleDoctorService(req.query.date,req.query.doctorId);
        return res.status(200).json(
            info
        )
        
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server ..."
        })
    }
}

let getExtraDoctorInfo = async (req,res) => {
    try {
        let info = await DoctorService.getExtraDoctorInfoService(req.query.doctorId);
        return res.status(200).json(
            info
        )
        
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server ..."
        })
    }
}

let getProfileDoctorById = async (req,res) => {
    try {
        let info = await DoctorService.getProfileDoctorByIdService(req.query.doctorId);
        return res.status(200).json(
            info
        )
        
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server ..."
        })
    }
}

let getListPatientForDoctor = async (req,res) => {
    try {
        let info = await DoctorService.getListPatientForDoctorService(req.query.doctorId, req.query.date);
        return res.status(200).json(
            info
        )
        
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server ..."
        })
    }
}

let postHandleSendRemedy = async (req,res) => {
    try {
        let info = await DoctorService.postHandleSendRemedyService(req.body);
        return res.status(200).json(
            info
        )
        
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server ..."
        })
    }
}

module.exports = {
    handleGetDoctor,
    handleGetAllDoctor,
    handlePostInfoDoctor,
    handleGetDoctorById,
    bulkCreateSchedule,
    getScheduleDoctor,
    getExtraDoctorInfo,
    getProfileDoctorById,
    getListPatientForDoctor,
    postHandleSendRemedy
}