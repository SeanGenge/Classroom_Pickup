// For testing purposes I hardcoded the values based on the below
const students = [
	{
		"first_name": "Barbara",
		"last_name": "williams",
		"class": "A"
	},
	{
		"first_name": "Sarah",
		"last_name": "Walker",
		"class": "A"
	},
	{
		"first_name": "Steven",
		"last_name": "Rodriguez",
		"class": "A"
	},
	{
		"first_name": "Richard",
		"last_name": "Campbell",
		"class": "A"
	},
	{
		"first_name": "Susan",
		"last_name": "Jones",
		"class": "A"
	},
	{
		"first_name": "Ashley",
		"last_name": "Garcia",
		"class": "A"
	},
	{
		"first_name": "Thomas",
		"last_name": "Davis",
		"class": "A"
	},
	{
		"first_name": "John",
		"last_name": "Taylor",
		"class": "A"
	},
	{
		"first_name": "Donna",
		"last_name": "Mitchell",
		"class": "A"
	},
	{
		"first_name": "Michael",
		"last_name": "Miller",
		"class": "A"
	},
	{
		"first_name": "Paul",
		"last_name": "Roberts",
		"class": "B"
	},
	{
		"first_name": "Anthony",
		"last_name": "White",
		"class": "B"
	},
	{
		"first_name": "Margaret",
		"last_name": "Campbell",
		"class": "B"
	},
	{
		"first_name": "Joshua",
		"last_name": "Brown",
		"class": "B"
	},
	{
		"first_name": "Donna",
		"last_name": "Sanchez",
		"class": "B"
	},
	{
		"first_name": "Lisa",
		"last_name": "Jones",
		"class": "B"
	},
	{
		"first_name": "Patricia",
		"last_name": "Gonzalez",
		"class": "B"
	},
	{
		"first_name": "Sandra",
		"last_name": "Lee",
		"class": "B"
	},
	{
		"first_name": "Emily",
		"last_name": "Brown",
		"class": "B"
	},
	{
		"first_name": "Kimberly",
		"last_name": "White",
		"class": "B"
	},
	{
		"first_name": "Donald",
		"last_name": "Baker",
		"class": "B"
	},
	{
		"first_name": "Richard",
		"last_name": "Smith",
		"class": "B"
	},
	{
		"first_name": "Ashley",
		"last_name": "Green",
		"class": "B"
	},
	{
		"first_name": "Michael",
		"last_name": "Perez",
		"class": "B"
	},
	{
		"first_name": "Daniel",
		"last_name": "Hill",
		"class": "B"
	},
];

// First names and last names were retrieved online
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
	const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
	
	return lastName[0].toUpperCase() + lastName.slice(1).toLocaleLowerCase();
};

module.exports = { generateStudents, students };