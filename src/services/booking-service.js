const axios = require("axios")
const db = require('../models');
const {BookingRepository}= require("../repositoties");
const CustomError = require("../util/errors");
const { StatusCodes } = require("http-status-codes");
const { BookingStatus } = require("../util/common");
const booking= new BookingRepository()


async function createBooking(data){
    try {
        const transaction = await db.sequelize.transaction();
        const noOfSeat=data.totalTickets
        const showId=data.showId
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

async function isPaymentSuccesfull(data,status){
    console.log(data,status)
    if(status=="true"){
        const transaction = await db.sequelize.transaction();
        const response= await booking.searchBooking(data.id,transaction)
        if(response.dataValues.Status==BookingStatus.status.BOOKED){
            throw new CustomError("Tickets already booked",StatusCodes.FORBIDDEN)
        }
        else if(response.dataValues.Status===BookingStatus.status.CANCELLED){
            throw new CustomError("Tickets already Cancelled",StatusCodes.FORBIDDEN)
        }
        else{
            const updateBooking= booking.updateBooking({Status:BookingStatus.status.BOOKED},data,transaction)
            return updateBooking
        }
    }
    else{
        throw new CustomError("Booking not done ,Payment Failed",StatusCodes.NOT_ACCEPTABLE)
    }
}

async function deleteBooking(bookingId){  
    
    try {
        const transaction = await db.sequelize.transaction();
        const response= await booking.searchBooking(bookingId,transaction)
        const showId=response.dataValues.showId
        const noOfSeat=response.dataValues.totalTickets
        const updateSeats = await axios.put(`http://localhost:3000/api/v1/show/${noOfSeat}`,{id:showId,inc:true})
        if (updateSeats.data.Status=="Success"){
            const deleteBooking=await booking.DeleteBooking(bookingId,transaction)
            return deleteBooking

        }
        else{
            throw new CustomError("Failed to delete",StatusCodes.INTERNAL_SERVER_ERROR)
        }
    } catch (error) {
        throw error
    }
}
const bookingService={createBooking,deleteBooking,isPaymentSuccesfull}
module.exports=bookingService
    
