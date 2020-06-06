import mongoose from 'mongoose'
import UserSignatureSchema from './UserSignatureSchema'

const UnitTrSchema = new mongoose.Schema({
    _id: {
        type: String,
        trim: true,
        required: true
    },
    // unitId
    for: {
        type: String,
        trim: true,
        required: true
    },
    lang: {
        type: String,
        required: true,
        maxlength: [3, 'max length is 3 symbols'],
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },
    // heading: [ { _id, title, for }] - agregated field only on read

    created: UserSignatureSchema,
    updated: UserSignatureSchema
})

module.exports =
    mongoose.models.UnitTr || mongoose.model('UnitTr', UnitTrSchema, 'unit-tr')