import dbConnect from '../../../utils/dbConnect'
import MaterialTr from '../../../models/MaterialTr'
import checkFirebaseAuth from '../../../firebase/authCheck'
import { addUserSignature } from '../../../utils/functions'

dbConnect()

export default async(req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            //
            try {
                const materialTrs = await MaterialTr.find(req.query)
                res.status(200).json({ success: true, data: materialTrs })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PATCH':
            try {
                await checkFirebaseAuth(req, res)
                const { _id = '', action } = req.body
                delete req.body.action
                console.log('action', action)
                let materialTr = {}

                if (action === 'create') {
                    addUserSignature(req, 'create')
                    materialTr = await MaterialTr.create(req.body)
                } else {
                    addUserSignature(req, 'update')
                    await MaterialTr.findByIdAndUpdate(_id, req.body, {
                        new: true,
                        runValidators: true
                    }).lean()
                }

                if (!materialTr) {
                    return res
                        .status(400)
                        .json({ success: false, message: 'problem while writing data' })
                }
                res.status(200).json({ success: true, data: materialTr })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(400).json({ success: false })
    }
}