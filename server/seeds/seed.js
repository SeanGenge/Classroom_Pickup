const sequelize = require('../config/connection');
const { Student, Registration, Student_rego } = require('../models');

const studentSeedData = require('./studentSeedData.js');
const registrationSeedData = require('./registrationSeedData.js');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	const students = await Student.bulkCreate(studentSeedData.generateStudents());
	
	const registrations = await Registration.bulkCreate(registrationSeedData.generateRegistrations());
	
	// Each student needs to be connected to at least one registration
	for (const { id } of students) {
		// Create a new entry in the student_rego table
		const newStudentRego = await Student_rego.create({
			"student_id": id,
			// Get a random registration
			"registration_id": registrations[Math.floor(Math.random() * registrations.length)].id
		});
	}
	
	// Since one student might have multiple registrations, add some here
	for (let i = 0; i < 5; i++) {
		const newStudentRego = await Student_rego.create({
			// Get a random student
			"student_id": students[Math.floor(Math.random() * students.length)].id,
			// Get a random registration
			"registration_id": registrations[Math.floor(Math.random() * registrations.length)].id
		});
	}

	process.exit(0);
};

seedDatabase();
