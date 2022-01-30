const { Sequelize, DataTypes } = require('sequelize');
let db;

if(process.env.DATABASE_URL) {
    db = new Sequelize(process.env.DATABASE_URL)
}else {
    db = new Sequelize({
        dialect: 'sqlite',
        storage: __dirname + '/dbLog.db'
    })
}

const Tasks = db.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
    startTime: {
        type: DataTypes.STRING,
        allowNull: true
    },
    deadline: {
        type: DataTypes.STRING,
        allowNull: true
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM('high', 'medium', 'ignoreable'),
        allowNull: false
    }
});

//TODO: create a schema for questions 
const Questions = db.define('questions', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false        
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    }
}) 

module.exports = {
    Tasks, Questions, db
}