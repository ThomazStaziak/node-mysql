const express    = require('express')
const bodyParser = require('body-parser')
const faker      = require('faker')
const times      = require('lodash.times')
const random     = require('lodash.random')
const db         = require('./models')
const apiPost    = require('./app/api/post')
const apiAuthor  = require('./app/api/author')
const app        = express()

app.use(bodyParser.json())
app.use(express.static('app/public'))

apiPost(app, db)
apiAuthor(app, db)

db.sequelize.sync().then(() => {
    db.author.bulkCreate(
        times(10, () => ({
            firstName: faker.firstName(),
            lastName : faker.lastName()
        }))
    )
    db.post.bulkCreate(
        times(10, () => ({
            title   : faker.lorem.setence(),
            content : faker.lorem.paragraph()
        }))
    )
})