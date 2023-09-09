const express= require("express")
const {BookingController}= require("../../controller")
const router= express.Router()
router.post("/",BookingController.bookingCreate)
// router.put("/",cityController.cityUpdate)
// router.get("/",cityController.cityFindAll)
// router.get("/:id",cityController.cityFind)
// router.delete('/',cityController.cityRemove)
module.exports={BookingRoutes:router}