import { db } from "./dbConnect.js"
import { ObjectId } from "mongodb"

const coll = db.collection("pictures")

//CRUD: GET 
export async function getAllPics (req,res) {
    const { regionName } = req.params
    
    const pic = await coll
    .find({ region: regionName })
    .toArray();
    res.send(pic)
}


//CRUD: POST
export async function addPic (req,res) {
    const newPic = req.body; 
    await coll.insertOne(newPic); 
    getAllPics(req,res); 
    // res.status(201).send({message: "new picture added"}); 
}

//CRUD: DELETE
export async function deletePic (req,res) {
    try {
        const picId = {"_id": new ObjectId (req.params.picId)};
        await coll.deleteOne(picId);
        getAllPics(req,res); 
    } catch (error) {
        console.error(error)
        res.status(500).send({error: "Error"})
    }
}