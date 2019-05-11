const mysql      = require('mysql')

const connection = mysql.createConnection({
    host    : "localhost",
    port    : "3306",
    user    : "staziak",
    password: "staziak",
    database: "node_mysql"
})

const createTableCostumers = conn => {
    const sql = `
        CREATE TABLE IF NOT EXISTS customers (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(1000) NOT NULL,
            cpf CHAR(11) NOT NULL
        );
    `
    conn.query(sql, (error, results, fields) => {
        if (error)
            return console.log(error)
        console.log('table customers has been created!')
        addCostumerRows(conn)
    })
}

const addCostumerRows = (conn) => {   
    const sql = `INSERT INTO customers(nome, cpf) VALUES ?`

    const values = [
        ['Thomaz', '12345678901'],
        ['Vitória', '12345678901'],
        ['Ana', '12345678901']
    ]

    conn.query(sql, [values], (error, results, fields) => {
        if (error)
            return console.log(error)
        console.log(`data inserted into customers table!`)
    })
}

connection.connect((err) => {
    if (err) 
        return console.log(err)
    
    console.log('connected!')
    createTableCostumers(connection)
})