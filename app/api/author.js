module.exports = (app, db) => {
    app.get('/author/:id', (req, res) => {
        db.author.findById(req.params.id)
            .then((result) => res.json(result))
    })

    app.get('/last/author/', (req, res) => {
        db.author.findAll({
            order: [['id', 'DESC']],
            limit: 1
        }).then((result) => res.json(result))
    })
}