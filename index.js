const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const port       = 3000
const mysql      = require('mysql')
const router     = express.Router()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


router.get('/', (req, res) => res.json({ message: 'Working!' }));
router.get('/customers', (req, res) => {
    execQuery('SELECT * FROM customers', res)
})
router.get('/customers/:id?', (req, res) => {
    let filter = ''

    if (req.params.id)
        filter = `WHERE id = ${parseInt(req.params.id)}`
    execQuery(`SELECT * FROM customers ${filter}`, res)
})
router.delete('/customers/:id', (req, res) => {
    execQuery(`DELETE FROM customers WHERE id = ${parseInt(req.params.id)}`, res)
})
router.post('/customers', (req, res) => {
    const name = req.body.nome
    const cpf  = req.body.cpf

    execQuery(`INSERT INTO customers(nome, cpf) VALUES (${name}, ${cpf})`, res)
})
router.patch('/customers/:id', (req, res) => {
    const id   = parseInt(req.params.id)
    const nome = req.body.nome
    const cpf  = req.body.cpf

    execQuery(`UPDATE customers SET nome = ${nome}, cpf = ${cpf} WHERE id = ${id}`, res)
})
app.use('/', router)

app.listen(port)
console.log('API working')

const execQuery = (query, res) => {
    const connection = mysql.createConnection({
        host    : "localhost",
        port    : "3306",
        user    : "staziak",
        password: "staziak",
        database: "node_mysql"
    })

    connection.query(query, (error, results, fields) => {
        if (error)
            res.json(error)
        else
            res.json(results)
        connection.end()
        console.log('executed')
    })
}

