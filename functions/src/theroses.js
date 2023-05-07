import { db } from "./dbConnect.js"
import { ObjectId } from "mongodb"

const coll = db.collection("pictures")

//CRUD: GET 
export async function getAllPics (req,res) {
    const pics = await coll.find({}).toArray();
    res.send(pics)
}

//CRUD: POST
export async function addPic (req,res) {
    const newPic = req.body; 
    await coll.insertOne(newPic); 
    res.status(201).send({message: "new picture added"}); 
}

//CRUD: DELETE
export async function deletePic(req,res) {
    try {
    const theRoseId = {"_id": new ObjectId (req.params.theRoseId)};
    await coll.deleteOne(theRoseId);
    await getAllPics(req,res); 
    } catch (error) {
    res.status(500).send({error: "Deleted picture for the database."})
    }
}

//CRUD: UPDATE (add if possible)
export async function updatePicCollection(req, res) {
    const theRoseId = {"_id":new ObjectId (req.params.theRoseId)}; 
    const updatePicCollection = {$set: req.body}; 
    const returnOption = { returnNewDocument: true }; 

    const query = await coll.findOneAndUpdate (theRoseId, updatePicCollection, returnOption); 
    await getAllPics(req, res)
    res.status(201).send({message: "Picture database has been updated"}); 
    console.table(query.value);
}
