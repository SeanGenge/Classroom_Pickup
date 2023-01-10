const sequelize = require('../config/connection');
const { Student, Registration, Student_rego } = require('../models');

const studentSeedData = require('./studentSeedData.js');
const registrationSeedData = require('./registrationSeedData.js');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const students = await Student.bulkCreate(studentSeedData.generateStudents());

  // for (const { id } of drivers) {
  //   const newLicense = await License.create({
  //     driver_id: id,
  //   });
  // }

  // for (const car of carSeedData) {
  //   const newCar = await Car.create({
  //     ...car,
  //     // Attach a random driver ID to each car
  //     driver_id: drivers[Math.floor(Math.random() * drivers.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
