module.exports = (app) => {
    app.get('/', (req, res) => {
       res.json({ "API node e sequelize": "V1.0" })
    })
}