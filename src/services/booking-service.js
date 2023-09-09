const axios = require("axios")
const db = require('../models');
const {BookingRepository}= require("../repositoties");
const CustomError = require("../util/errors");
const { StatusCodes } = require("http-status-codes");
const booking= new BookingRepository()


async function createBooking(data){
    const transaction = await db.sequelize.transaction();
    const noOfSeat=data.totalTickets
    const showId=data.showId
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/show/${showId}`)
        if(response.data.Status=="Success"){
            const availableSeats=response.data.Data.availableSeats
            
            if(noOfSeat<=availableSeats){
                const createBooking = await axios.put(`http://localhost:3000/api/v1/show/${noOfSeat}`,{id:showId})
                const bookingPayload={...data,totalPrice:(parseInt(createBooking.data.Data.costEach)*noOfSeat)}
               
                try {
                    const create= await booking.createBooking(bookingPayload,transaction)
                    await transaction.commit()
                    return create
                } catch (error) {
                    await transaction.rollback()
                    throw error
                }
                
            }
            else{
                throw new CustomError("Not Enough Seats",StatusCodes.NOT_ACCEPTABLE)
            }
        }
        else{
            throw new CustomError("Show Not Found",StatusCodes.NOT_FOUND)
        }
       
    } catch (error) {
        throw error
    }
    
    
}
const bookingService={createBooking}
module.exports=bookingService
    
