const Sequelize = require('sequelize');

const contactModel = require('../models/contacts');
const userModel = require('../models/user');

const sequelize = new Sequelize('libreta_contactos', 'root', 'root' ,{
  host: 'localhost',
  dialect: 'mysql'
});

const Contact = contactModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);

User.hasMany(Contact, {foreignKey: "user_id"});
Contact.belongsTo(User) 

sequelize.sync({ force: false })
  .then(() => {
    console.log('Tablas sincronizadas');
  })

module.exports = {
  Contact,
  User
}