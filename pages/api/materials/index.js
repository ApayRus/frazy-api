import dbConnect from '../../../utils/dbConnect'
import Material from '../../../models/Material'
import checkFirebaseAuth from '../../../firebase/authCheck'

dbConnect()

export default async(req, res) => {
    const { method } = req

    const auth = await checkFirebaseAuth(req)
    console.log('auth', auth)
    console.log('req.user', req.user)

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
                const {
                    user: { userId, userName },
                } = req
                const userSignature = { userId, userName, time: Date.now() }
                req.body = {
                    ...req.body,
                    created: userSignature,
                    updated: userSignature,
                }
                const material = await Material.create(req.body)
                res.status(201).json({ success: true, data: material })
            } catch (error) {
                console.log('error', error)
                res.status(400).json({ success: false })
            }

            break
    }
}