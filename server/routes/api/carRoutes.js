const router = require('express').Router();
const { Car, StudentCar, Student } = require('../../models');
const studentSeedData = require('../../seeds/studentSeedData');
const carSeedData = require('../../seeds/carSeedData.js');
const studentCarData = require("../../seeds/studentCarData.js");

router.get('/', async (req, res) => {
	try {
		const carData = await Car.findAll();

		res.status(200).json(carData);
	}
	catch (err) {
		res.status(500).json(err);
	}
});

router.get('/resetall', async (req, res) => {
	try {
		// Since currently you can only add/remove data from the studentCar table, this is the only table that needs to be truncated
		await StudentCar.truncate({
			where: {},
			cascade: true,
			restartIdentity: true
		});
		
		const studentCarCreate = await StudentCar.bulkCreate(studentCarData.studentCar);

		res.status(200).json(studentCarCreate);
	}
	catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
