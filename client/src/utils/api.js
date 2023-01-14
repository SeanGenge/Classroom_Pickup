export const getStudentsTakingCar = async (rego, studentIds) => {
	// Fetch all students taking the car that haven't already left
	return await fetch(`/api/studentcar/${rego}`, {
		method: 'POST',
		body: JSON.stringify({ "studentIds": studentIds }),
		headers: {
			'Content-Type': 'application/json',
		}
	})
		.then(response => response.json());
};

export const getStudentsFromClass = async (classroom_no) => {
	return await fetch(`/api/student/class/${classroom_no}`)
		.then(response => response.json());
}

export const getAllStudents = async () => {
	return await fetch(`/api/student/`)
		.then(response => response.json());
};

export const getStudentCar = async () => {
	// Fetch all students and the cars taking them
	return await fetch(`/api/studentcar/`)
		.then(response => response.json());
};

export const getAllCars = async () => {
	return await fetch(`/api/car/`)
		.then(response => response.json());
}

export const bulkCreateStudentCar = async (newStudentCar) => {
	return await fetch(`/api/studentcar/`, {
		method: 'POST',
		body: JSON.stringify({"studentCarData": newStudentCar}),
		headers: {
			'Content-Type': 'application/json',
		}
	})
		.then(response => response.json());
};

export const bulkDeleteStudentCar = async (deleteStudentCar) => {
	return await fetch(`/api/studentcar/`, {
		method: 'DELETE',
		body: JSON.stringify({ "studentCarData": deleteStudentCar }),
		headers: {
			'Content-Type': 'application/json',
		}
	})
		.then(response => response.json());
};