const mongoose = require('mongoose')

const db = 'mongodb+srv://user:user@cluster0.rufss.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB is connected")
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectDB