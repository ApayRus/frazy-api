export default async(req, res) => {
    // for routs like: material/123/ru
    const {
        query: { params }
    } = req
    res.status(200).send({ params })
}