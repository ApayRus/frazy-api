import mongoose from 'mongoose'
import UserSignatureSchema from './UserSignatureSchema'

const MaterialSchema = new mongoose.Schema({
    _id: {
        type: String,
        trim: true,
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    lang: {
        type: String,
        required: [true, 'Please add a language code'],
        maxlength: [3, 'max length is 3 symbols'],
        trim: true
    },
    mediaLink: {
        type: String,
        required: [true, 'Please upload a file or add an external media link'],
        trim: true
    },
    youtubeId: {
        type: String,
        trim: true,
        maxlength: 11
    },
    description: {
        type: String,
        trim: true
    },
    unit: {
        type: String,
        trim: true
    },
    order: {
        type: String,
        trim: true
    },
    phrases: { type: Object },
    duration: {
        type: Number,
        trim: true
    },
    // translations: [ { _id, title, lang } ] - agregated field only on read

    created: UserSignatureSchema,
    updated: UserSignatureSchema
})

module.exports =
    mongoose.models.Material ||
    mongoose.model('Material', MaterialSchema, 'material')