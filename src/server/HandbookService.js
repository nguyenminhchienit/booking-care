import db from "../models/index";
require('dotenv').config()
import _ from 'lodash'

let postCreateNewHandbookService = (data) => {
    return new Promise ( async (resolve,reject) => {
        try {
            if(!data.topicHandbook || !data.imageBase64 || !data.desHTML || !data.desMarkdown){
                resolve({
                    errCode: 1,
                    message: "Missing params"
                })
            }else{
                await db.Handbook.create({
                    topicHandbook: data.topicHandbook,
                    image: data.imageBase64,
                    desHTML: data.desHTML,
                    desMarkdown: data.desMarkdown
                })
                resolve({
                    errCode: 0,
                    message: "Save handbook succeed!",
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    postCreateNewHandbookService
}