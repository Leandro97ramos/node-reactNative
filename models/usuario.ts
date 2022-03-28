import {DataTypes} from 'sequelize';
import db  from '../db/connection'

const User = db.define('users', {

    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },



});


export default User;