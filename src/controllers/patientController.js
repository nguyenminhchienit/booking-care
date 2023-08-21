import PatientService from '../server/PatientService'

let handlePostAppointment = async (req,res) => {
    try {
        let info = await PatientService.handlePostAppointmentService(req.body);
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
    handlePostAppointment
}