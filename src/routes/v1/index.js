const {StatusCodes}=require("../../config")
const express=require("express")
router=express.Router();
router.get("/info",(req,res)=>{
    res.json({
        sucess:true,
        data:"THIS IS INFO",
        error:{},
        status:StatusCodes.OK

    })
})
router.get("/about",(req,res)=>{
    res.json({
        sucess:true,
        data:"THIS IS ABOUT",
        error:{},
        status:StatusCodes.OK

    })
})

module.exports=router