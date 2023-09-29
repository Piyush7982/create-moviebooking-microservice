const axios = require("axios")
const db = require('../models');
const {BookingRepository}= require("../repositoties");
const CustomError = require("../util/errors");
const { StatusCodes } = require("http-status-codes");
const { BookingStatus } = require("../util/common");
const booking= new BookingRepository()

async function findAllBooking(){
    try {
        const response = await booking.findAll()
        return response
    } catch (error) {
        throw error
    }
}
async function createBooking(data){
    try {
        if(!data.userId){
            throw new CustomError("Id cannot be null",StatusCodes.BAD_REQUEST)
        }
        const transaction = await db.sequelize.transaction();
        const noOfSeat=data.totalTickets
        const showId=data.showId
        const response = await axios.get(`http://localhost:5000/api/v1/show/${showId}`)
        if(response.data.Status=="Success"){
            const availableSeats=response.data.Data.availableSeats
            
            if(noOfSeat<=availableSeats){
                const createBooking = await axios.put(`http://localhost:5000/api/v1/show/${noOfSeat}`,{id:showId})
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
   
    if(status){
        const transaction = await db.sequelize.transaction();
        
        const response= await booking.searchBooking(data.id,transaction)
        if(!response){
            throw new CustomError("Booking Not Found", StatusCodes.BAD_GATEWAY)
        }
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
        const updateSeats = await axios.put(`http://localhost:5000/api/v1/show/${noOfSeat}`,{id:showId,inc:true})
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
const bookingService={createBooking,deleteBooking,isPaymentSuccesfull,findAllBooking}
module.exports=bookingService
    
