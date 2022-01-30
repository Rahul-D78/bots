import { Sequelize, DataTypes } from 'sequelize';

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
        type: DataTypes.NUMBER,
        allowNull: false
    },
    endTime: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM('high', 'medium', 'ignoreable'),
        allowNull: false
    }
});

//TODO: create a schema for questions 

export default {
    db, Tasks
}