const sequelize = require('../config/connection');
const { Student, Registration, Student_rego } = require('../models');

const studentSeedData = require('./studentSeedData.js');
const registrationSeedData = require('./registrationSeedData.js');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });
	
	const students = await Student.bulkCreate(studentSeedData.generateStudents());
	
	const registrations = await Registration.bulkCreate(registrationSeedData.registrationNumbers);
	
	let count = 0;
	
	// Each student needs to be connected to at least one registration
	for (const { id } of students) {
		// Start off with a random registration
		let registration = registrations[Math.floor(Math.random() * registrations.length)].id;
		
		// Make sure to use all the registrations at least once. For testing purposes
		if (count < registrations.length) {
			registration = registrations[count].id;
		}
		
		// Create a new entry in the student_rego table
		const newStudentRego = await Student_rego.create({
			"student_id": id,
			
			"registration_id": registration
		});
		
		count++;
	}
	
	process.exit(0);
};

seedDatabase();
