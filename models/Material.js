const mongoose = require('mongoose')

const UserSignatureSchema = new mongoose.Schema({
    userId: { type: String },
    userName: { type: String },
    time: { type: Number },
}, { _id: false })

const MaterialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    lang: {
        type: String,
        required: [true, 'Please add a language code'],
        maxlength: [3, 'max length is 3 symbols'],
        trim: true,
    },
    mediaLink: {
        type: String,
        required: [true, 'Please upload a file or add an external media link'],
        trim: true,
    },
    youtubeId: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    unit: {
        type: String,
        trim: true,
    },
    order: {
        type: String,
        trim: true,
    },
    phrases: { type: Object },
    created: UserSignatureSchema,
    updated: UserSignatureSchema,
})

module.exports =
    mongoose.models.Material || mongoose.model('Material', MaterialSchema)