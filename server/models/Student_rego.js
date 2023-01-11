const { UUIDV4, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Student_rego extends Model {}

// This table is required as there is a many to many relationship between the registrations and students
Student_rego.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		registration_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'registration',
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
		modelName: 'student_rego',
	}
);

module.exports = Student_rego;
