const sequelize = require('../config/connection');
const { Student, Car, StudentCar } = require('../models');

const studentSeedData = require('./studentSeedData.js');
const carSeedData = require('./carSeedData.js');
const studentCarData = require("./studentCarData.js");

const seedDatabase = async () => {
	await sequelize.sync({ force: true });
	
	const students = await Student.bulkCreate(studentSeedData.students);
	const registrations = await Car.bulkCreate(carSeedData.registrationNumbers);
	const studentCar = await StudentCar.bulkCreate(studentCarData.studentCar);
	
	process.exit(0);
};

seedDatabase();
