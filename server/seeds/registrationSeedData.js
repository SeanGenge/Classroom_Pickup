// You can use these hardcoded values to test
const registrationNumbers = [
	{"registration": "AAA111"},
	{ "registration": "AAB111"},
	{ "registration": "PGB742"},
	{ "registration": "QWE460"},
	{ "registration": "WER326"},
	{ "registration": "TER760"},
	{ "registration": "YUI430"},
	{ "registration": "QWE993"},
	{ "registration": "RMA922"},
	{ "registration": "YUT777"},
	{ "registration": "POI821"},
	{ "registration": "TER025"},
	{ "registration": "ORE832"},
	{ "registration": "RET543"}
]

const generateRegistrations = function() {
	// Decided not to use this as it can make testing a bit more difficult
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let registrations = [];
	
	for (let i = 0; i < 10; i++) {
		let currentRego = "";
		
		for (let i = 0; i < 6; i++) {
			if (i < 3) {
				// The letter part of the rego
				currentRego += alphabet[Math.floor(Math.random() * alphabet.length)];
			}
			else {
				// Number part of the rego
				currentRego += Math.floor(Math.random() * 10);
			}
		}
		
		registrations.push({ "registration": currentRego });
	}
	
	return registrations;
};



module.exports = { generateRegistrations, registrationNumbers };