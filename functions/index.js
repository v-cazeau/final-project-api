import functions from "firebase-functions"
import express from "express"; 
import cors from "cors"; 

import { addPic, deletePic, getAllPics, getCountries, getRegions} from "./src/pictures.js"; 

const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    res.send("MongoDB. I am root.");
    console.log(`MongoDB. I am root.`)
});

app.get("/theroses/carousel", getAllPics);
app.get("/theroses", getRegions); 
app.get("/theroses", getCountries); 
app.post("/theroses", addPic);
app.delete("/theroses/:theRoseId", deletePic);
// app.patch("/theroses/:theRoseId",updatePicCollection)

// app.listen(PORT, () => {
//     console.log (`Listening on port: ${PORT}...`)
// })

export const api = functions.https.onRequest(app); 

