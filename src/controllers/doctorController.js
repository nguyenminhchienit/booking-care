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

module.exports = {
    handleGetDoctor
}