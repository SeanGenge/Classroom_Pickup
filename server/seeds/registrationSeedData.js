const generateRegistration = function() {
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
				if (i === 3) {
					// Add the dash
					currentRego += "-";
				}
				
				// Number part of the rego
				currentRego += Math.floor(Math.random() * 10);
			}
		}
		
		registrations.push({ "registration": currentRego });
	}
	
	return registrations;
};

module.exports = { generateRegistration };