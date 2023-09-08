const express= require("express")
const {V1routes}= require("./v1")
const router= express.Router()
router.use("/v1",V1routes)
module.exports={router}