import React, { useState, useEffect } from 'react';

function StudentItem({ student, thisStudentRego, handleStudentRegoUpdate, updateNumStudentsLeft, updateNumStudentsPickedUp }) {
	const [shouldHighlight, setShouldHighlight] = useState(false);
	
	const handleCheckboxOnClick = () => {
		const checkbox = document.getElementById(`studentId_${student.id}`);
		
		if (checkbox.checked) {
			// Remove the student
			updateNumStudentsLeft(-1);
			updateNumStudentsPickedUp(1);
		}
		else {
			// Add the student
			updateNumStudentsLeft(1);
			updateNumStudentsPickedUp(-1);
		}
		
		handleStudentRegoUpdate(student.id, checkbox.checked);
	};
	
	return (
		<div className={`${thisStudentRego.length > 0 ? "highlight" : ""} student-item`}>
			<input className="form-check-input mt-2" type="checkbox" id={`studentId_${student.id}`} value={student.id} onClick={handleCheckboxOnClick} />
			<label className="form-check-label student-name">  {student.first_name} {student.last_name}</label>
			<button className="btn btn-primary"><i className="fa-solid fa-pen-to-square"></i></button>
		</div>
	);
}

export default StudentItem;