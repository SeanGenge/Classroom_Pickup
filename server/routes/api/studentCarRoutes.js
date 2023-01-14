const router = require('express').Router();
const { Student, Car, StudentCar } = require('../../models');
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
	// Retrieve all the student registrations
	try {
		const StudentCarData = await StudentCar.findAll({
			include: [{ model: Student }, { model: Car }]
		});

		res.status(200).json(StudentCarData);
	}
	catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:rego', async (req, res) => {
	// Retrieve all the students that belong to a certain registration (Perfect match)
	try {
		const StudentCarData = await StudentCar.findAll({
			include: [
				{
					model: Student,
				},
				{
					model: Car,
					where: {
						registration: {
						[Op.like]: req.params.rego
					}
				}
			}],
			
		});

		res.status(200).json(StudentCarData);
	}
	catch (err) {
		res.status(500).json(err);
	}
});

router.post('/:rego', async (req, res) => {
	// Retrieves a list of students where their ids are not in the studentIds list and where the pickup car has registration "rego"
	try {
		const StudentCarData = await StudentCar.findAll({
			include: [
				{
					model: Student,
					where: {
						id: {
							[Op.notIn]: req.body.studentIds
						}
					}
				},
				{
					model: Car,
					where: {
						registration: {
							[Op.eq]: req.params.rego
						}
					}
				}],

		});

		res.status(200).json(StudentCarData);
	}
	catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
