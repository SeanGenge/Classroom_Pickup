const router = require('express').Router();
const { Registration } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const registrationData = await Registration.findAll();

		res.status(200).json(registrationData);
	}
	catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
