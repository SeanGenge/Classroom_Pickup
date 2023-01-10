const router = require('express').Router();
const { Student_rego } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const studentRegoData = await Student_rego.findAll();

		res.status(200).json(studentRegoData);
	}
	catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
