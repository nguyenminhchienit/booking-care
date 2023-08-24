import SpecialtyService from '../server/SpecialtyService'
let postCreateNewSpecialty = async (req,res) => {
    try {
        let info = await SpecialtyService.postCreateNewSpecialtyService(req.body);
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

let getAllSpecialty = async (req,res) => {
    try {
        let info = await SpecialtyService.getAllSpecialtyService();
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

let getSpecialtyDoctorById = async (req,res) => {
    try {
        let info = await SpecialtyService.getSpecialtyDoctorByIdService(req.query.id,req.query.location);
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
    postCreateNewSpecialty,
    getAllSpecialty,
    getSpecialtyDoctorById
}