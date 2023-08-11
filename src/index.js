const {port}= require("./config")
const express= require("express")
const app=express()
const route=require("./routes")

app.use("/api",route)

app.listen(3000,()=>{
    console.log("Started successfully")
})