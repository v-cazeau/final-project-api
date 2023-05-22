import functions from "firebase-functions"
import express from "express"; 
import cors from "cors"; 

import { addPic, deletePic, getAllPics } from "./src/pictures.js"; 

// const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    res.send("MongoDB. I am root.");
    console.log(`MongoDB. I am root.`)
});

app.get("/theroses/carousel/:regionName", getAllPics);
app.post("/theroses/upload", addPic);
app.delete("/theroses/:picId", deletePic);

// app.listen(PORT, () => {
//     console.log (`Listening on port: ${PORT}...`)
// })

export const api = functions.https.onRequest(app); 

