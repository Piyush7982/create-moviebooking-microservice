const {BookingStatus}= require("../util/common")
const {INITIATED,BOOKED,PENDING,CANCELLED}= BookingStatus.status
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    userId: {type:DataTypes.INTEGER,allowNull:false},
    showId: {type:DataTypes.INTEGER,allowNull:false},
    totalTickets:{type:DataTypes.INTEGER,allowNull:false},
    totalPrice:{type:DataTypes.INTEGER,allowNull:false},
    Status: {type:DataTypes.ENUM,values:[INITIATED,BOOKED,PENDING,CANCELLED],defaultValue:PENDING,allowNull:false}
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};