const dotenv= require("dotenv")
dotenv.config({ path: '../../.env' })
const PORT=process.env.PORT

module.exports={PORT:PORT}