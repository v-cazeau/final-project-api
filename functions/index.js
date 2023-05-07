import functions from "firebase-functions"
import express from "express"; 
import cors from "cors"; 

import { addPic, deletePic, getAllPics, updatePicCollection } from "./src/theroses.js"; 

const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())

app.get("/theroses", getAllPics);
app.post("/theroses", addPic);
app.delete("/theroses/:theRoseId", deletePic);
app.patch("/theroses/:theRoseId",updatePicCollection)

app.listen(PORT, () => {
    console.log (`Listening on port: ${PORT}...`)
})

export const api = functions.https.onRequest(app); 

