const Car = require('./Car');
const StudentCar = require('./StudentCar');
const Student = require('./Student');

// Creating associations between the tables here

Car.hasMany(StudentCar, {
	foreignKey: 'car_id',
	onDelete: 'CASCADE',
});

StudentCar.belongsTo(Car, {
	foreignKey: 'car_id'
})

Student.hasMany(StudentCar, {
	foreignKey: 'student_id',
	onDelete: 'CASCADE',
});

StudentCar.belongsTo(Student, {
	foreignKey: 'student_id'
})

module.exports = { Car, StudentCar, Student };
