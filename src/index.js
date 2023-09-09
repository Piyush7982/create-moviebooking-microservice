const express= require("express")
const axios = require("axios")
const {router}= require("./routes")

const app= express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api",router)

app.listen(4000,()=>{
    console.log("server started")
})















