import React, { useState, useEffect } from 'react';
import StudentItem from './StudentItem';

function Classroom({ classroom_no, rego, studentRego }) {
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
	
	const studentList = students.map((student, id) => {
		const thisStudentRego = studentRego?.filter(sr => sr.student_id === student.id && rego === sr.registration.registration);
		console.log(thisStudentRego);
		return <StudentItem rego={rego} student={student} thisStudentRego={thisStudentRego} key={id} />
	});
	
	return (
		<div>
			<div>{classroom_no}</div>
			<form>
				{studentList}
			</form>
		</div>
	);
}

export default Classroom;