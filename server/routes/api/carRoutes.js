const router = require('express').Router();
const { Car } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const carData = await Car.findAll();

		res.status(200).json(carData);
	}
	catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
