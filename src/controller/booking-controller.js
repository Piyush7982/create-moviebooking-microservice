const { BookingService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../util/common");
const { TokenUtil } = require("../util/common");

async function bookingCreate(req, res) {
  try {
    console.log("inside booking");
    const uid = await TokenUtil.decodeToken(req.cookies.access_token);

    const response = await BookingService.createBooking({
      userId: uid.id,
      showId: req.body.showId,
      totalTickets: req.body.totalTickets,
    });
    SuccessResponse.Data = response;
    SuccessResponse.Message = "succesfully created";
    return res.json(SuccessResponse);
  } catch (error) {
    ErrorResponse.Error = error;
    res
      .status(
        error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);

    throw error;
  }
}
async function bookingFindAll(req, res) {
  try {
    const response = await BookingService.findAllBooking();
    SuccessResponse.Data = response;
    SuccessResponse.Message = "succesfully created";
    return res.json(SuccessResponse);
  } catch (error) {
    ErrorResponse.Error = error;
    res
      .status(
        error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);

    throw error;
  }
}

async function bookingUpdatePayment(req, res) {
  try {
    const status = req.body.status;
    const response = await BookingService.isPaymentSuccesfull(
      { id: req.body.bookingId },
      status
    );
    SuccessResponse.Data = response;
    SuccessResponse.Message = "succesfully created";
    return res.json(SuccessResponse);
  } catch (error) {
    ErrorResponse.Error = error;
    res
      .status(
        error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);

    throw error;
  }
}
async function bookingDelete(req, res) {
  try {
    const bookingId = req.body.bookingId;
    const response = await BookingService.deleteBooking(bookingId);
    SuccessResponse.Data = response;
    SuccessResponse.Message = "succesfully created";
    return res.json(SuccessResponse);
  } catch (error) {
    ErrorResponse.Error = error;
    res
      .status(
        error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);

    throw error;
  }
}

const bookingController = {
  bookingCreate,
  bookingDelete,
  bookingUpdatePayment,
  bookingFindAll,
};
module.exports = bookingController;
