const mongoose = require("mongoose")

const UserSignatureSchema = new mongoose.Schema({
    userId: { type: String },
    userName: { type: String },
    time: { type: Number },
}, { _id: false })

export default UserSignatureSchema