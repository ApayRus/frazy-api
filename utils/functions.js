export const addUserSignature = (req, mode) => {
    const {
        user: { userId, userName }
    } = req
    const userSignature = { userId, userName, time: Date.now() }
    req.body = {
        ...req.body,
        updated: userSignature,
        created: userSignature
    }
    if (mode === 'update') delete req.body.created
}