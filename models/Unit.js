import mongoose from 'mongoose'
import UserSignatureSchema from './UserSignatureSchema'

const UnitSchema = new mongoose.Schema({
    _id: {
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
    logo: {
        type: String,
        trim: true
    },
    background: {
        type: String,
        trim: true
    },
    // heading: [ { _id, title, order, created, updated }] - agregated field only on read

    created: UserSignatureSchema,
    updated: UserSignatureSchema
})

module.exports =
    mongoose.models.Unit || mongoose.model('Unit', UnitSchema, 'unit')