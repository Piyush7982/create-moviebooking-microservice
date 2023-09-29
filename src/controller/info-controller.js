const express= require("express")
const {SuccessResponse,ErrorResponse}= require("../util/common")
const CustomError = require("../util/errors")
const { StatusCodes } = require("http-status-codes")
const router= express.Router()
router.get("/",(req,res)=>{
   
    try {
        SuccessResponse.Data="Inside Info Controller booking,Api is working"
        return res.json({
            SuccessResponse
        })
        
    } catch (error) {
        ErrorResponse.Error=error.name
        ErrorResponse.Message=error.message
        res.json({
            ErrorResponse
        })
        throw new CustomError(error.message,StatusCodes.BAD_REQUEST)
    }
   
})
module.exports={router}