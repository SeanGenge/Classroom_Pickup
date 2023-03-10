import React, { useState, useEffect } from 'react';
import StudentItem from './StudentItem';
import { getStudentsFromClass } from '../utils/api.js';

function Classroom({ classroom_no, rego, studentCar, addOrRemoveStudent, studentIdsWhoLeft }) {
	const [students, setStudents] = useState([]);
	// Only need to store the number of students that are picked up
	const [numStudentsPickedUp, setNumStudentsPickedUp] = useState(0);
	
	useEffect(() => {
		// Called once on load
		const fetchData = async () => {
			// Fetch the student data from the back-end
			setStudents(await getStudentsFromClass(classroom_no));
		};
		
		fetchData();
	}, [classroom_no]);
	
	const updateNumStudentsPickedUp = (incr) => {
		setNumStudentsPickedUp(numStudentsPickedUp + incr);
	}
	
	// This is represents each student in the classroom
	const studentList = students.map((student, id) => {
		// Check the student ids who left to determine if this student should be highlighted or not
		const hasThisStudentAlreadyLeft = !studentIdsWhoLeft.filter(sid => sid === student.id).length;
		
		return <StudentItem student={student} rego={rego} studentCar={studentCar} addOrRemoveStudent={addOrRemoveStudent} updateNumStudentsPickedUp={updateNumStudentsPickedUp} hasThisStudentAlreadyLeft={hasThisStudentAlreadyLeft} key={id} />
	});
	
	const getNumStudentsLeft = () => {
		return students.length - numStudentsPickedUp;
	}
	
	const preventSubmit = (e) => {
		// Prevent the form from being submitted and refreshing the page
		e.preventDefault();
	}
	
	return (
		<div className="row">
			<div className="col-sm-12 classroom-heading mt-4">
				{`Class ${classroom_no}`}
			</div>
			<div className="row text-center">
				<div className="col-sm-12">
					{getNumStudentsLeft()} students remaining
				</div>
				<div className="col-sm-12">
					{numStudentsPickedUp} students picked up
				</div>
			</div>
			<form className="col-sm-12 text-center mt-3" onSubmit={(e) => preventSubmit(e)}>
				{studentList}
			</form>
		</div>
	);
}

export default Classroom;