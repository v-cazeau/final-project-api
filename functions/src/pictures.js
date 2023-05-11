import { db } from "./dbConnect.js"
import { ObjectId } from "mongodb"

const coll = db.collection("pictures")

//CRUD: GET 
export async function getAllPics (req,res) {
    const img = await coll.find({}).toArray();
    res.send(img)
}

export async function getRegions (req, res) {
    const regions = await coll.find({}).toArray(); 
    res.send(regions)
}
export async function getCountries (req, res) {
    const countries = await coll.find({}).toArray(); 
    res.send(countries)
}

//CRUD: POST
export async function addPic (req,res) {
    const newImg = req.body; 
    await coll.insertOne(newImg); 
    res.status(201).send({message: "new picture added"}); 
}

//CRUD: DELETE
export async function deletePic(req,res) {
    try {
    const imgId = {"_id": new ObjectId (req.params.imgId)};
    await coll.deleteOne(imgId);
    await getAllPics(req,res); 
    } catch (error) {
    res.status(500).send({error: "Deleted picture for the database."})
    }
}

//CRUD: UPDATE (add if possible)
export async function updatePicCollection(req, res) {
    const imgId = {"_id":new ObjectId (req.params.picId)}; 
    const updatePicCollection = {$set: req.body}; 
    const returnOption = { returnNewDocument: true }; 

    const query = await coll.findOneAndUpdate (imgId, updatePicCollection, returnOption); 
    await getAllPics(req, res)
    res.status(201).send({message: "Picture database has been updated"}); 
    console.table(query.value);
}
