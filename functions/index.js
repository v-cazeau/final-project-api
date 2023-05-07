import express from "express"; 
import cors from "cors"; 

import { addPic, deletePic, getAllPics } from "./src/theroses.js"; 

const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())

app.get("/theroses", getAllPics);
app.post("/theroses", addPic);
app.delete("/theroses/:docID", deletePic);


app.listen(PORT, () => {
    console.log (`Listening on port: ${PORT}...`)
})

