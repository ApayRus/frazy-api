import dbConnect from '../../../utils/dbConnect'
import Material from '../../../models/Material'
import checkFirebaseAuth from '../../../firebase/authCheck'
import addUserSignature from '../../../utils/functions'

dbConnect()

export default async(req, res) => {
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
        case 'PATCH':
            try {
                await checkFirebaseAuth(req, res)

                const {
                    body: { _id }
                } = req

                const mode = _id ? 'update' : 'create'

                addUserSignature(req, mode)

                const material = _id ?
                    await Material.findOneAndUpdate({ _id }, req.body, {
                        new: true,
                        upsert: true,
                        runValidators: true
                    }) :
                    await Material.create(req.body)

                if (!material) {
                    return res.status(400).json({ success: false, message: 'problem while writing data' })
                }
                res.status(200).json({ success: true, data: material })
            } catch (error) {
                // console.log("error", JSON.stringify(error));
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(400).json({ success: false })
    }
}