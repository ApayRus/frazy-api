import dbConnect from '../../../utils/dbConnect'
import Event from '../../../models/Event'
import checkFirebaseAuth from '../../../firebase/authCheck'
import { addUserSignature } from '../../../utils/functions'

dbConnect()

export default async(req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            //
            try {
                const events = await Event.find(req.query)
                res.status(200).json({ success: true, data: events })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PATCH':
            try {
                await checkFirebaseAuth(req, res)
                const { _id = '', action } = req.body
                delete req.body.action
                let event = {}

                if (action === 'create') {
                    addUserSignature(req, 'create')
                    event = await Event.create(req.body)
                } else {
                    addUserSignature(req, 'update')
                    event = await Event.findByIdAndUpdate(_id, req.body, {
                        new: true,
                        runValidators: true
                    }).lean()
                }

                if (!event) {
                    return res
                        .status(400)
                        .json({ success: false, message: 'problem while writing data' })
                }
                res.status(200).json({ success: true, data: event })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(400).json({ success: false })
    }
}