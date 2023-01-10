const router = require('express').Router();
const { Student, Registration, Student_rego } = require('../../models');

router.get('/', async (req, res) => {
	res.json({test: "works!"});
});

module.exports = router;
