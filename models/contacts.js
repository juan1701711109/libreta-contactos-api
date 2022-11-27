module.exports = (sequelize, type) => {
	return sequelize.define('contact', {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: type.STRING,
		lastname: type.STRING,
		email: type.STRING,
		phone: type.STRING,
		cellphone: type.STRING,
		address: type.STRING,
		favorite: {
			type: type.BOOLEAN,
			defaultValue: false,
		},	
	})
}