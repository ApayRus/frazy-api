import mongoose from 'mongoose'

const connection = {}

async function dbConnect() {
	console.log('process.env', process.env)
	if (connection.isConnected) {
		return
	}

	const db = await mongoose.connect(process.env.mongo_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})

	connection.isConnected = db.connections[0].readyState
	console.log(connection.isConnected)
}

export default dbConnect
