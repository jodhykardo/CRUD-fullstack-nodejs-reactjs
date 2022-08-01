const mongoose = require('mongoose');
const mongoUri = process.env.mongoURI;

const connectDB = async () => {
    try {
        const res = await mongoose.connect(mongoUri, {
            useNewUrlParser: true
        });

        console.log('MongoDB Connected!');
        console.log("Connection Succesful to database: " + res.connection.name);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;