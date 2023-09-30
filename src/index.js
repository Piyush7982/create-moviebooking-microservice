const express= require("express")
const cookieParser = require('cookie-parser')
const {router}= require("./routes")
const {ServerPort}= require("./config")


const app= express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use("/api",router)


app.listen(ServerPort,()=>{
    console.log(`Server Started on Port ${ServerPort}`)
})
// async function testing(){
//     const response= await Booking.findByPk(1)
//     console.log(response.dataValues.totalTickets)
// }
// testing()













