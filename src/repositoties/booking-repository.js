const crud= require("./crud-repository")
const {BookingStatus}= require("../util/common")
const {Booking}= require("../models")
const CustomError = require("../util/errors")
const { StatusCodes } = require("http-status-codes")

class bookingRepository extends crud{
    constructor(){
        super(Booking)
    }
    async createBooking(data,transaction){
        try {
            
            const response= await Booking.create(data,{transaction:transaction})
            return response
        } catch (error) {
            // console.error(error.message)
            // throw new CustomError(error.name,StatusCodes.BAD_REQUEST)
            throw error
        }        
    }
    async DeleteBooking(id,transaction){
        try {
            
            const response= await Booking.update({Status:BookingStatus.status.CANCELLED},{where:{id:id}},{transaction:transaction})
            return response
        } catch (error) {
            // console.error(error.message)
            // throw new CustomError(error.name,StatusCodes.BAD_REQUEST)
            throw error
        }        
    }
    async searchBooking(id,transaction){
        try {
            
            const response= await Booking.findByPk(id,{transaction:transaction})
            return response
        } catch (error) {
            // console.error(error.message)
            // throw new CustomError(error.name,StatusCodes.BAD_REQUEST)
            throw error
        }        
    }
    
    
    async updateBooking(newData,searchData,transaction){
        try {
            const response= await Booking.update(newData, {where: searchData},{transaction:transaction})
            return response
        } catch (error) {
            throw new CustomError(error.name,StatusCodes.BAD_REQUEST)
        }        
    }
}
module.exports=bookingRepository