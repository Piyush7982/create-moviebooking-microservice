const express= require("express")
const {infoController}= require('../../controller')
const router= express.Router()
router.use("/info",infoController)


module.exports={V1routes:router}