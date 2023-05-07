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
    res.status(201).send("new picture added"); 
}

//CRUD: DELETE
export async function deletePic(req,res) {
    const docId = {"_id": new ObjectId (req.params.docId)}
    await coll.deleteOne(docId);
    res.status(201).send({message: "Deleted picture for the database."})
}

//CRUD: UPDATE (add if possible)
export async function updatePicCollection(req, res) {
    const docID = {"_id":new ObjectId (req.params.docId)}; 
    const updatePicCollection = {$set: req.body}; 
    const returnOption = { returnNewDocument: true }; 

    const query = await coll.findOneAndUpdate (docID, updatePicCollection, returnOption); 

    res.status(201).send({ message: "Picture database has been updated"}); 
    console.table(query.value);
}
