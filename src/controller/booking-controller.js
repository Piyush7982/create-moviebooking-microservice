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

const bookingController={bookingCreate}
module.exports=bookingController
    