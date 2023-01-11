import React, { useState, useEffect } from 'react';

function StudentItem({ student, rego, thisStudentRego, handleStudentRegoUpdate }) {
	const [shouldHighlight, setShouldHighlight] = useState(false);
	
	const handleCheckboxOnClick = () => {
		const checkbox = document.getElementById(`studentId_${student.id}`);
		
		handleStudentRegoUpdate(student.id, checkbox.checked);
	};
	
	return (
		<div className={`${thisStudentRego.length > 0 ? "yellow" : ""} student-item`}>
			<input type="checkbox" id={`studentId_${student.id}`} value={student.id} onClick={handleCheckboxOnClick} />
			<span>  {student.first_name} {student.last_name}</span>
		</div>
	);
}

export default StudentItem;