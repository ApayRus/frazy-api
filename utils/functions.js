const addUserSignature = (req, mode) => {
    const {
        user: { userId, userName },
    } = req
    const userSignature = { userId, userName, time: Date.now() }
    switch (mode) {
        case "update":
            req.body = {
                ...req.body,
                updated: userSignature,
            }
            break
        case "create":
            req.body = {
                ...req.body,
                updated: userSignature,
                created: userSignature,
            }
            break
        default:
            break
    }
}

export default addUserSignature