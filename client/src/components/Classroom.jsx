import React, { useState, useEffect } from 'react';
import StudentItem from './StudentItem';

function Classroom({ classroom_no, rego, studentRego, handleStudentRegoUpdate }) {
	const [students, setStudents] = useState([]);
	
	useEffect(() => {
		// Called once on load
		const fetchData = async () => {
			// Fetch the student data from the back-end
			await fetch(`/api/student/class/${classroom_no}`)
			.then(response => response.json())
			.then(result => {
				setStudents(result);
			});
		};
		
		fetchData();
	}, [classroom_no]);
	
	// This is represents each student in the classroom
	const studentList = students.map((student, id) => {
		// Filters out the student registration to check if there is a match with the student id and registration. If there is a match then we know that the student belongs to that registration
		const thisStudentRego = studentRego?.filter(sr => sr.student_id === student.id && rego === sr.registration.registration);
		
		return <StudentItem rego={rego} student={student} thisStudentRego={thisStudentRego} handleStudentRegoUpdate={handleStudentRegoUpdate} key={id} />
	});
	
	return (
		<div className="classroom">
			<div className="classroom-heading">{`Class ${classroom_no}`}</div>
			<form className="classroom-form">
				{studentList}
			</form>
		</div>
	);
}

export default Classroom;