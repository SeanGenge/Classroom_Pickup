const sequelize = require('../config/connection');
const { Student, Car, StudentCar } = require('../models');

const studentSeedData = require('./studentSeedData.js');
const carSeedData = require('./carSeedData.js');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });
	
	const students = await Student.bulkCreate(studentSeedData.generateStudents());
	
	const registrations = await Car.bulkCreate(carSeedData.registrationNumbers);
	
	let count = 0;
	
	// Each student needs to be connected to at least one registration
	for (const { id } of students) {
		// Start off with a random registration
		let registration = registrations[Math.floor(Math.random() * registrations.length)].id;
		
		// Make sure to use all the registrations at least once. For testing purposes
		if (count < registrations.length) {
			registration = registrations[count].id;
		}
		
		// Create a new entry in the StudentCar table
		const newStudentCar = await StudentCar.create({
			"student_id": id,
			"car_id": registration
		});
		
		count++;
	}
	
	// Manually create some duplicates to test some use cases
	const newStudentCar = [
		{
			"student_id": 1,
			"car_id": 2
		},
		{
			"student_id": 11,
			"car_id": 1
		}
	];
	
	const extraStudentCarData = await StudentCar.bulkCreate(newStudentCar);
	
	process.exit(0);
};

seedDatabase();
