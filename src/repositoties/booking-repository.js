const crud= require("./crud-repository")

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
    async updateBooking(newData,searchData,transaction){
        try {
            const response= await Booking.create(newData, {where: searchData},{transaction:transaction})
            return response
        } catch (error) {
            throw new CustomError(error.name,StatusCodes.BAD_REQUEST)
        }        
    }
       
    
}
module.exports=bookingRepository