const Registration = require('./Registration');
const Student_rego = require('./Student_rego');
const Student = require('./Student');

// Creating associations between the tables here

Registration.hasMany(Student_rego, {
	foreignKey: 'registration_id',
	onDelete: 'CASCADE',
});

Student.hasMany(Student_rego, {
	foreignKey: 'student_id',
	onDelete: 'CASCADE',
});



module.exports = { Registration, Student_rego, Student };
