const express = require("express")
require("express-async-errors")
const app = express()
app.use(express.json())
const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")
const rateLimiter=require("express-rate-limit")
require("dotenv").config()
const jobsRouter = require("./routes/jobs")
const notFound = require('./middleware/not-found.js')
const errorHandlerMiddleware = require("./middleware/error-handler")
const authRouter = require("./routes/auth.js")
const auth = require("./middleware/authentication.js")
app.set('trust proxy',1)
const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max:100
})
app.use(limiter)
app.use(cors())
app.use(helmet())
app.use(xss())
app.get('/', (req, res) => {
    res.send("it worked")
})
app.use('/jobs',auth, jobsRouter)
app.use("/auth",authRouter)
app.use(notFound)
app.use(errorHandlerMiddleware)
const connectdB = require("./db/connect")


const start = async () => {
    try {
        await connectdB(process.env.MONGO_URI)
        app.listen(process.env.PORT || 3000, function(){
            console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
          });
    }
    catch (err){
        console.log(err)
    }
}
start()