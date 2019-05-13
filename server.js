const express    = require('express')
const bodyParser = require('body-parser')
const faker      = require('faker')
const times      = require('lodash.times')
const random     = require('lodash.random')
const db         = require('./models')
const apiPost    = require('./app/api/post')
const apiAuthor  = require('./app/api/author')
const apiIndex   = require('./app/api/index')
const app        = express()

app.use(bodyParser.json())
app.use(express.static('app/public'))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

apiPost(app, db)
apiAuthor(app, db)
apiIndex(app)

 db.sequelize.sync().then(() => {
    db.author.bulkCreate(
        times(10, () => ({
            avatar   : faker.image.imageUrl(300, 250, "people"),
            firstName: faker.name.firstName(),
            lastName : faker.name.lastName(),
            synopsis : faker.lorem.paragraph()
        }))
    )
    db.post.bulkCreate(
        times(10, () => ({
            image   : faker.image.imageUrl(680, 330, "nature"),
            title   : faker.lorem.sentence(),
            content : faker.lorem.paragraph(),
            authorId: random(1, 10)
        }))
    )

    app.listen(3000, () => console.log('API working on port 3000'))
})