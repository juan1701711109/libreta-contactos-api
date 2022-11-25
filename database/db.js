const Sequelize = require('sequelize');

const contactModel = require('../models/contacts');

const sequelize = new Sequelize('libreta_contactos', 'root', 'root' ,{
  host: 'localhost',
  dialect: 'mysql'
});

const Contact = contactModel(sequelize, Sequelize);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Tablas sincronizadas');
  })

module.exports = {
  Contact
}