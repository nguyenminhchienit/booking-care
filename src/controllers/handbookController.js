import HandbookService from '../server/HandbookService'

let postCreateNewHandbook = async (req,res) => {
    try {
        let info = await HandbookService.postCreateNewHandbookService(req.body);
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
    postCreateNewHandbook
}
