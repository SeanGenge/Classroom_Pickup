const router = require('express').Router();
const { Student } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const studentData = await Student.findAll();

		res.status(200).json(studentData);
	}
	catch (err) {
		res.status(500).json(err);
	}
});

router.get('/class/:classId', async (req, res) => {
	try {
		const studentData = await Student.findAll({
			where: {
				class: req.params.classId
			}
		});

		res.status(200).json(studentData);
	}
	catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
