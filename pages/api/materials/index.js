import dbConnect from '../../../utils/dbConnect'
import Material from '../../../models/Material'

dbConnect()

export default async (req, res) => {
	const { method } = req
	switch (method) {
		case 'GET':
			try {
				const materials = await Material.find(req.query)
				res.status(200).json({ success: true, data: materials })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		case 'POST':
			try {
				const material = await Material.create(req.body)
				res.status(201).json({ success: true, data: material })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
	}
}
