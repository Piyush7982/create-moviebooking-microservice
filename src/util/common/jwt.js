const jwt= require("jsonwebtoken")
async function decodeToken(token){
    const userInfo= jwt.decode(token)
    return userInfo
}
const TokenUtil={decodeToken}
module.exports=TokenUtil