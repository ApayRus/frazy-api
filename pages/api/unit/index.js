import dbConnect from '../../../utils/dbConnect'
import Unit from '../../../models/Unit'
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
                const { _id } = req.query
                    // MULTIPLE
                if (!_id) {
                    const units = await Unit.find(req.query)
                    res.status(200).json({ success: true, data: units })
                }
                // SINGLE
                else {
                    const unitPromise = Unit.findById(_id)
                    const headingPromise = Material.find({ unit: _id }, { _id: 1, lang: 1, title: 1, created: 1, updated: 1, duration: 1 })
                    const [unit, heading = []] = await Promise.all([
                        unitPromise,
                        headingPromise
                    ])
                    const response = {...unit._doc, heading }
                    res.status(200).json({ success: true, data: response })
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

                let unit = {}

                if (action === 'create') {
                    addUserSignature(req, 'create')
                    unit = await Unit.create(req.body)
                } else {
                    addUserSignature(req, 'update')
                    unit = await Unit.findByIdAndUpdate(_id, req.body, {
                        new: true,
                        runValidators: true
                    }).lean()
                }

                if (!unit) {
                    return res.status(400).json({
                        success: false,
                        message: 'problem while writing translation'
                    })
                }
                res.status(200).json({ success: true, data: unit })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(400).json({ success: false })
    }
}