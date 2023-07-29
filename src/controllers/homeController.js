import db from "../models/index";
import CRUDservice from '../server/CRUDservice'

let getHomePage = async (req,res) => {
    try {       
        let data = await db.User.findAll();
        return  res.render("homePage.ejs",{data: JSON.stringify(data)});
    } catch (e) {
        console.log(e);
    }
}

let getCRUD = async (req,res) => {
    return res.render("crud.ejs")
}

let postCRUD = async (req,res) => {
    let message = await CRUDservice.createNewUser(req.body)
    console.log(message)
    return res.send("HELLO")
}

let displayGetCRUD = async (req,res) => {
    let data = await CRUDservice.getAllUser();
    res.render("displayCRUD.ejs", {data: data})
}

let getEditCRUD = async (req,res) => {
     let userId = (req.query.id)
     if(userId){
         let userData = await CRUDservice.getUserInfoByID(userId);
         console.log(userData)
         return res.render("editCRUD.ejs",{data: userData})
     }else{
         return res.send("User not found")
     }
}

let putCRUD =   async (req,res) => {
    let data = req.body;
    await CRUDservice.updateUserData(data);
    res.redirect("/get-crud");
}

let deleteCRUD = async (req,res) => {
    let userId = req.query.id;
    if(userId){
        await CRUDservice.deleteUserByID(userId)
        return res.redirect("/get-crud")
    }else{
        return res.send("User not found");
    }
}

module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD
}