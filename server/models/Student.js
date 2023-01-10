const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Student extends Model {}

Student.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		// Hardcoding the classes as well
		class: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	},
	{
		sequelize,
		timestamps: true,
		underscored: true,
		freezeTableName: true,
		modelName: 'student',
	}
);

module.exports = Student;
