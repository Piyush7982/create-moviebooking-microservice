const {BookingService}= require("../services")
const {SuccessResponse,ErrorResponse}= require("../util/common")

async function bookingCreate(req,res){
    try {
        const response= await BookingService.createBooking({userId:req.body.userId,showId:req.body.showId,totalTickets:req.body.totalTickets})
        SuccessResponse.Data=response
        SuccessResponse.Message="succesfully created"
        return res.json(SuccessResponse)
        
    } catch (error) {
        
        res.json({
            status:"failed",
            error:"",
            comment:"failed to  create booking",
            
        })
        throw error
    }
}
async function bookingUpdatePayment(req,res){
    try {
        const response= await BookingService.isPaymentSuccesfull({id:req.body.bookingId},req.body.status)
        SuccessResponse.Data=response
        SuccessResponse.Message="succesfully created"
        return res.json(SuccessResponse)
        
    } catch (error) {
        
        res.json({
            status:"failed",
            error:"",
            comment:"failed to  create booking",
            
        })
        throw error
    }
}
async function bookingDelete(req,res){
    try {
        const bookingId=req.body.bookingId
        const response= await BookingService.deleteBooking(bookingId)
        SuccessResponse.Data=response
        SuccessResponse.Message="succesfully created"
        return res.json(SuccessResponse)
        
    } catch (error) {
        
        res.json({
            status:"failed",
            error:"",
            comment:"failed to  create booking",
            
        })
        throw error
    }
}

const bookingController={bookingCreate,bookingDelete,bookingUpdatePayment}
module.exports=bookingController
    