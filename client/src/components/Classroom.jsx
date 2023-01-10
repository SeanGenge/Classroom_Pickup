import React, { useState, useEffect } from 'react';
import StudentItem from './StudentItem';

function Classroom({ classroom_no }) {
	const [students, setStudents] = useState([]);
	
	useEffect(() => {
		// Called once on load
		const fetchData = async () => {
			// Fetch the student data from the back-end
			await fetch(`/api/student/class/${classroom_no}`)
			.then(response => response.json())
			.then(result => {
				setStudents(result);
				console.log(result);
			});
		};
		
		fetchData();
	}, []);
	
	const studentList = students.map((student, id) => {
		return <StudentItem student={student} key={id} />
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