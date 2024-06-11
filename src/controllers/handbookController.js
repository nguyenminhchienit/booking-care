import HandbookService from "../server/HandbookService";

let postCreateNewHandbook = async (req, res) => {
  try {
    let info = await HandbookService.postCreateNewHandbookService(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

let getHandbookById = async (req, res) => {
  try {
    let info = await HandbookService.getHandbookByIdService(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

let getAllHandbook = async (req, res) => {
  try {
    let info = await HandbookService.getAllHandbookService(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

let handleUpdateHandbookById = async (req, res) => {
  let data = req.body;
  let message = await HandbookService.updateHandbookById(data);
  return res.status(200).json(message);
};

let handleDeleteHandbook = async (req, res) => {
  let id = req.body.id;
  console.log("id: ", id);
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing params!!",
    });
  }
  let message = await HandbookService.deleteHandbook(id);
  return res.status(200).json(message);
};

module.exports = {
  postCreateNewHandbook,
  getHandbookById,
  getAllHandbook,
  handleDeleteHandbook,
  handleUpdateHandbookById,
};
