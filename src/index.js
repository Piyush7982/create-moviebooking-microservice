const express= require("express")
const cookieParser = require('cookie-parser')
const axios = require("axios")
const {router}= require("./routes")
const {Booking}= require("./models")
const app= express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use("/api",router)


app.listen(4001,()=>{
    console.log("server started")
})
// async function testing(){
//     const response= await Booking.findByPk(1)
//     console.log(response.dataValues.totalTickets)
// }
// testing()













