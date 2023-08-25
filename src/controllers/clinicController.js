import ClinicService from '../server/ClinicService'

let postCreateNewClinic = async (req,res) => {
    try {
        let info = await ClinicService.postCreateNewClinicService(req.body);
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
    postCreateNewClinic
}