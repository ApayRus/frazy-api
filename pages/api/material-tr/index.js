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
                const { _id, for: forMaterial, lang } = req.query
                    // SINGLE
                if (_id) {
                    const materialTr = await MaterialTr.findById(_id)
                    res.status(200).json({ success: true, data: materialTr })
                }
                if (forMaterial && lang) {
                    const materialTr = await MaterialTr.findOne({
                        for: forMaterial,
                        lang
                    })
                    res.status(200).json({ success: true, data: materialTr })
                }
                // MULTIPLE
                else {
                    const materialTrs = await MaterialTr.find(req.query)
                    res.status(200).json({ success: true, data: materialTrs })
                }
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

                let materialTr = {}

                if (action === 'create') {
                    addUserSignature(req, 'create')
                    materialTr = await MaterialTr.create(req.body)
                } else {
                    addUserSignature(req, 'update')
                    materialTr = await MaterialTr.findByIdAndUpdate(_id, req.body, {
                        new: true,
                        runValidators: true
                    }).lean()
                }

                if (!materialTr) {
                    return res.status(400).json({
                        success: false,
                        message: 'problem while writing translation'
                    })
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