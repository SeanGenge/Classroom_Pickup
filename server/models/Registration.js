const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Registration extends Model {}

Registration.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		registration: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: 'registration',
	}
);

module.exports = Registration;
