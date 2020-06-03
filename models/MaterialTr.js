import mongoose from 'mongoose'
import UserSignatureSchema from './UserSignatureSchema'

// Material Translation
const MaterialTrSchema = new mongoose.Schema({
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
    // materialId
    for: {
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
    description: {
        type: String,
        trim: true
    },
    phrases: { type: Object },
    created: UserSignatureSchema,
    updated: UserSignatureSchema
})

module.exports =
    mongoose.models.MaterialTr ||
    mongoose.model('MaterialTr', MaterialTrSchema, 'material-tr')