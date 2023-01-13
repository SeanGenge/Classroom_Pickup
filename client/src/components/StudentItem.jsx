import React, { useState, useEffect } from 'react';

function StudentItem({ student, rego, studentCar, addOrRemoveStudent, updateNumStudentsPickedUp, hasThisStudentAlreadyLeft }) {
	
	const handleCheckboxOnClick = () => {
		const checkbox = document.getElementById(`studentId_${student.id}`);
		
		if (checkbox.checked) {
			// Remove the student
			updateNumStudentsPickedUp(1);
		}
		else {
			// Add the student
			updateNumStudentsPickedUp(-1);
		}
		
		// Add or remove the student depending on the check box
		addOrRemoveStudent(student.id, checkbox.checked);
	};
	
	const shouldHighlight = () => {
		// Returns true if the name should be hightlighted, if not returns false
		return hasThisStudentAlreadyLeft && studentCar.filter(sr => sr.car.registration === rego && sr.student_id === student.id).length;
	}
	
	return (
		<div className={`${shouldHighlight() ? "highlight" : ""} student-item`}>
			<input className="form-check-input" type="checkbox" id={`studentId_${student.id}`} value={student.id} onClick={handleCheckboxOnClick} />
			<label className="form-check-label student-name">  {student.first_name} {student.last_name}</label>
		</div>
	);
}

export default StudentItem;