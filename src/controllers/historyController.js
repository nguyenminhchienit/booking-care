import HistoriesService from "../server/HistoriesService";

let postHistories = async (req, res) => {
  try {
    let history = await HistoriesService.postHistoriesService(req.body);
    return res.status(200).json({
      data: history,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

let getAllHistories = async (req, res) => {
  try {
    let history = await HistoriesService.getAllHistoriesService();
    return res.status(200).json({
      data: history,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "Error from server ...",
    });
  }
};

module.exports = {
  postHistories,
  getAllHistories,
};
