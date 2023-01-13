const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class StudentCar extends Model {}

// This table is required as there is a many to many relationship between the registrations and students
StudentCar.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		car_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'car',
				key: 'id',
			},
		},
		student_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'student',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: 'studentCar',
	}
);

module.exports = StudentCar;
