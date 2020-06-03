import dbConnect from '../../../utils/dbConnect'
import Material from '../../../models/Material'
import checkFirebaseAuth from '../../../firebase/authCheck'
import { addUserSignature } from '../../../utils/functions'

dbConnect()

export default async(req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            //
            try {
                const materials = await Material.find(req.query)
                res.status(200).json({ success: true, data: materials })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PATCH':
            try {
                await checkFirebaseAuth(req, res)
                const { _id = '', action } = req.body

                if (!action) {
                    return res.status(400).json({
                        success: false,
                        message: 'body.action should be "create" or "update"'
                    })
                }

                let material = {}

                if (action === 'create') {
                    addUserSignature(req, 'create')
                    material = await Material.create(req.body)
                } else {
                    addUserSignature(req, 'update')
                    material = await Material.findByIdAndUpdate(_id, req.body, {
                        new: true,
                        runValidators: true
                    }).lean()
                }

                if (!material) {
                    return res
                        .status(400)
                        .json({ success: false, message: 'problem while writing material' })
                }
                res.status(200).json({ success: true, data: material })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(400).json({ success: false })
    }
}