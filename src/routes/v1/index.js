const express= require("express")
const {infoController}= require('../../controller')
const {BookingRoutes}= require("./booking-routes")
const router= express.Router()
router.use("/info",infoController)
router.use("/booking",BookingRoutes)


module.exports={V1routes:router}