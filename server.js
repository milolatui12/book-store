const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')

const user = require ('./routes/user.route')
const admin = require('./routes/admin.route')
const book = require('./routes/book.route')
const {attachUser} = require('./middleware/user')

const corsConfig = {
    origin: true,
    credentials: true
}

const app = express();
app.use(cors(corsConfig))
app.use(express.json());
app.use(cookieParser())



app.use(book)
app.use(user)
app.use(attachUser)
app.use(admin)



const start = async () => {
    app.listen(5000, () => {
        console.log("running on port ", 5000)
    })
}

start()