import React, { useState, useEffect } from 'react';

function StudentItem({ student, rego, thisStudentRego }) {
	const [shouldHighlight, setShouldHighlight] = useState(false);
	
	const updateCheckbox = () => {
		
	};
	
	return (
		<div className={thisStudentRego.length > 0 ? "yellow" : ""}>
			<input type="checkbox" id="myCheck" value={student.id} onClick={updateCheckbox()} />
			<span>  {student.first_name} {student.last_name}</span>
		</div>
	);
}

export default StudentItem;