import dbConnect from '../../../utils/dbConnect'
import UnitTr from '../../../models/UnitTr'
import Material from '../../../models/Material'
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
                const { _id, for: forUnit, lang } = req.query
                    // SINGLE
                if (_id) {
                    const unitTr = await UnitTr.findById(_id)
                    res.status(200).json({ success: true, data: unitTr })
                }
                if (forUnit && lang) {
                    const unitTr = await UnitTr.findOne({
                        for: forUnit,
                        lang
                    })
                    let materialIds = await Material.find({ unit: forUnit }, { _id: 1 })
                    materialIds = materialIds.map((elem) => elem._id)
                    const heading = await MaterialTr.find({ for: { $in: materialIds }, lang }, { _id: 1, for: 1, title: 1 })
                    const response = {...unitTr._doc, heading }
                    res.status(200).json({ success: true, data: response })
                }
                // MULTIPLE
                else {
                    const unitTrs = await UnitTr.find(req.query)
                    res.status(200).json({ success: true, data: unitTrs })
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

                let unitTr = {}

                if (action === 'create') {
                    addUserSignature(req, 'create')
                    unitTr = await UnitTr.create(req.body)
                } else {
                    addUserSignature(req, 'update')
                    unitTr = await UnitTr.findByIdAndUpdate(_id, req.body, {
                        new: true,
                        runValidators: true
                    }).lean()
                }

                if (!unitTr) {
                    return res.status(400).json({
                        success: false,
                        message: 'problem while writing translation'
                    })
                }
                res.status(200).json({ success: true, data: unitTr })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(400).json({ success: false })
    }
}