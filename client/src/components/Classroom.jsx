import React, { useState, useEffect } from 'react';
import StudentItem from './StudentItem';

function Classroom({ classroom_no, rego, studentRego, handleStudentRegoUpdate, setCurrStudentId }) {
	const [students, setStudents] = useState([]);
	const [numStudentsLeft, setNumStudentsLeft] = useState(0);
	const [numStudentsPickedUp, setNumStudentsPickedUp] = useState(0);
	
	useEffect(() => {
		// Called once on load
		const fetchData = async () => {
			// Fetch the student data from the back-end
			await fetch(`/api/student/class/${classroom_no}`)
			.then(response => response.json())
			.then(result => {
				setStudents(result);
				setNumStudentsLeft(result.length);
			});
		};
		
		fetchData();
	}, [classroom_no]);
	
	const updateNumStudentsLeft = (incr) => {
		setNumStudentsLeft(numStudentsLeft + incr);
	}
	
	const updateNumStudentsPickedUp = (incr) => {
		setNumStudentsPickedUp(numStudentsPickedUp + incr);
	}
	
	// This is represents each student in the classroom
	const studentList = students.map((student, id) => {
		// Filters out the student registration to check if there is a match with the student id and registration. If there is a match then we know that the student belongs to that registration
		const thisStudentRego = studentRego?.filter(sr => sr.student_id === student.id && rego === sr.registration.registration);
		
		return <StudentItem student={student} thisStudentRego={thisStudentRego} handleStudentRegoUpdate={handleStudentRegoUpdate} updateNumStudentsLeft={updateNumStudentsLeft} updateNumStudentsPickedUp={updateNumStudentsPickedUp} setCurrStudentId={setCurrStudentId} key={id} />
	});
	
	const preventSubmit = (e) => {
		// Prevent the form from being submitted and refreshing the page
		e.preventDefault();
	}
	
	return (
		<div className="row">
			<div className="col-sm-12 classroom-heading">
				{`Class ${classroom_no}`}
			</div>
			<div className="row text-center">
				<div className="col-sm-12">
					{numStudentsLeft} students remaining
				</div>
				<div className="col-sm-12">
					{numStudentsPickedUp} students picked up
				</div>
			</div>
			<form className="col-sm-12 text-center" onSubmit={(e) => preventSubmit(e)}>
				{studentList}
			</form>
		</div>
	);
}

export default Classroom;