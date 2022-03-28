import { Sequelize } from 'sequelize';

const db = new Sequelize('db_task', 'root', '' , {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
    //logging: false,

});

export default db;