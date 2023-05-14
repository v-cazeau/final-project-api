import { db } from "./dbConnect.js"
import { ObjectId } from "mongodb"

const coll = db.collection("pictures")

//CRUD: GET 
export async function getAllPics (req,res) {
    const pic = await coll.find({}).toArray();
    res.send(pic)
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
    const newPic = req.body; 
    await coll.insertOne(newPic); 
    await getAllPics(req,res); 
    // res.status(201).send({message: "new picture added"}); 
}

//CRUD: DELETE
export async function deletePic (req,res) {
    try {
    const picId = {"_id": new ObjectId (req.params.picId)};
    await coll.deleteOne(picId);
    await getAllPics(req,res); 
    } catch (error) {
        console.error(error)
    res.status(500).send({error: "Deleted picture for the database."})
    }
}

//CRUD: UPDATE (add if possible)
export async function updatePicCollection(req, res) {
    const picId = {"_id":new ObjectId (req.params.picId)}; 
    const updatePicCollection = {$set: req.body}; 
    const returnOption = { returnNewDocument: true }; 

    const query = await coll.findOneAndUpdate (picId, updatePicCollection, returnOption); 
    await getAllPics(req, res)
    res.status(201).send({message: "Picture database has been updated"}); 
    console.table(query.value);
}
