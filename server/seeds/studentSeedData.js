const firstNames = [
	"Robert",
	"James",
	"John",
	"Michael",
	"William",
	"Richard",
	"Joseph",
	"Thomas",
	"Charles",
	"Christopher",
	"Daniel",
	"Mathew",
	"Anthony",
	"Mark",
	"Donald",
	"Steven",
	"Paul",
	"Andrew",
	"Joshua",
	"Mary",
	"Patricia",
	"Jennifer",
	"Linda",
	"Elizabeth",
	"Barbara",
	"Susan",
	"Jessica",
	"Sarah",
	"Karen",
	"Lisa",
	"nancy",
	"Betty",
	"Margaret",
	"Sandra",
	"Ashley",
	"Kimberly",
	"Emily",
	"Donna",
	"Michelle"
];

const lastNames = [
	"SMITH",
	"JOHNSON",
	"WILLIAMS",
	"BROWN",
	"JONES",
	"MILLER",
	"DAVIS",
	"GARCIA",
	"RODRIGUEZ",
	"WILSON",
	"MARTINEZ",
	"ANDERSON",
	"TAYLOR",
	"THOMAS",
	"HERNANDEZ",
	"MOORE",
	"MARTIN",
	"JACKSON",
	"THOMPSON",
	"WHITE",
	"LOPEZ",
	"LEE",
	"GONZALEZ",
	"HARRIS",
	"CLARK",
	"LEWIS",
	"ROBINSON",
	"WALKER",
	"PEREZ",
	"HALL",
	"YOUNG",
	"ALLEN",
	"SANCHEZ",
	"WRIGHT",
	"KING",
	"SCOTT",
	"GREEN",
	"BAKER",
	"ADAMS",
	"NELSON",
	"HILL",
	"RAMIREZ",
	"CAMPBELL",
	"MITCHELL",
	"ROBERTS",
	"CARTER",
	"PHILLIPS",
	"EVANS",
	"TURNER"
];

[
	{
		"first_name": "Ford",
		"last_name": "Mustang",
		"class": 40000
	},
]

const generateStudents = function() {
	let students = [];
	
	// Class A has 10 students
	for (let i = 0; i < 10; i++) {
		students.push({
			"first_name": generateFirstName(),
			"last_name": generateLastName(),
			"class": "A"
		});
	}
	
	// Class B has 15 students
	for (let i = 0; i < 15; i++) {
		students.push({
			"first_name": generateFirstName(),
			"last_name": generateLastName(),
			"class": "B"
		});
	}
	
	return students;
};

const generateFirstName = function() {
	return firstNames[Math.floor(Math.random() * firstNames.length)];
};

const generateLastName = function () {
	return lastNames[Math.floor(Math.random() * lastNames.length)];
};

module.exports = { generateStudents };