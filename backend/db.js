const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        const connection = await mongoose.connect(process.env.ATLAS_URI);
        console.log("connection established");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectdb;