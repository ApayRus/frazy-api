const mongoose = require('mongoose')

const MaterialSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please add a title'],
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
})

module.exports =
	mongoose.models.Material || mongoose.model('Material', MaterialSchema)
