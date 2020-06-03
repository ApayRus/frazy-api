import mongoose from 'mongoose'
import UserSignatureSchema from './UserSignatureSchema'

const EventSchema = new mongoose.Schema({
    _id: {
        type: String,
        trim: true,
        required: true
    },
    materialId: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    lang: {
        type: String,
        required: true,
        maxlength: [3, 'max length is 3 symbols'],
        trim: true
    },
    actions: {
        type: [String],
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    unit: {
        type: String,
        trim: true
    },

    // Translation
    translationId: {
        type: String,
        trim: true
    },
    trTitle: {
        type: String,
        trim: true
    },
    trLang: {
        type: String,
        maxlength: [3, 'max length is 3 symbols'],
        trim: true
    },
    translations: {
        type: [String],
        trim: true
    },

    created: UserSignatureSchema,
    updated: UserSignatureSchema
})

module.exports =
    mongoose.models.Event || mongoose.model('Event', EventSchema, 'event')