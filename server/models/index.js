const Registration = require('./Registration');
const Student_rego = require('./Student_rego');
const Student = require('./Student');

// Creating associations between the tables here

Registration.hasMany(Student_rego, {
	foreignKey: 'registration_id',
	onDelete: 'CASCADE',
});

Student_rego.belongsTo(Registration, {
	foreignKey: 'registration_id'
})

Student.hasMany(Student_rego, {
	foreignKey: 'student_id',
	onDelete: 'CASCADE',
});

Student_rego.belongsTo(Student, {
	foreignKey: 'student_id'
})

module.exports = { Registration, Student_rego, Student };
