module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('author', {
        id       : {
            type         : DataTypes.INTEGER,
            primaryKey   : true,
            autoIncrement: true
        },
        avatar   : DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName : DataTypes.STRING,
        synopsis : DataTypes.STRING(1000)
        },
        {
            freezeTableName: true,
        }
    );

    Author.associate = (models) => {
        Author.hasMany(models.post);
    };

    return Author;
}