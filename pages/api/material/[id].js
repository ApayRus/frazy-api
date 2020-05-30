import dbConnect from '../../../utils/dbConnect'
import Material from '../../../models/Material'

dbConnect()

export default async(req, res) => {
    const {
        method,
        query: { id }
    } = req
    switch (method) {
        case 'GET':
            try {
                const material = await Material.findById(id)
                if (!material) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: material })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}