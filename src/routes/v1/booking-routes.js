const express= require("express")

const {BookingController}= require("../../controller")
const { bookingFindAll } = require("../../controller/booking-controller")
const router= express.Router()
router.post("/",BookingController.bookingCreate)
router.delete("/",BookingController.bookingDelete)
router.put("/",BookingController.bookingUpdatePayment)
router.get("/",BookingController.bookingFindAll)
  

// router.put("/",cityController.cityUpdate)
// router.get("/",cityController.cityFindAll)
// router.get("/:id",cityController.cityFind)
// router.delete('/',cityController.cityRemove)
module.exports={BookingRoutes:router}