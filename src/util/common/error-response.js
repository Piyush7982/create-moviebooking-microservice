const {StatusCodes}= require("http-status-codes")
const errorResponse={
    Status:"Failed",
    StatusCode:StatusCodes.BAD_REQUEST,
    Error:{},
    Message:"Bad request"

}
module.exports=errorResponse