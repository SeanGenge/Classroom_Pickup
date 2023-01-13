const router = require('express').Router();
const { Student, Registration, Student_rego } = require('../../models');
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
	// Retrieve all the student registrations
	try {
		const studentRegoData = await Student_rego.findAll({
			include: [{ model: Student }, { model: Registration }]
		});

		res.status(200).json(studentRegoData);
	}
	catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:rego', async (req, res) => {
	// Retrieve all the students that belong to a certain registration (Perfect match)
	try {
		const studentRegoData = await Student_rego.findAll({
			include: [
				{
					model: Student,
				},
				{
					model: Registration,
					where: {
						registration: {
						[Op.like]: `${req.params.rego}`
					}
				}
			}],
			
		});

		res.status(200).json(studentRegoData);
	}
	catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
