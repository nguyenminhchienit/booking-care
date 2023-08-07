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

module.exports = {
    handleGetDoctor,
    handleGetAllDoctor,
    handlePostInfoDoctor
}