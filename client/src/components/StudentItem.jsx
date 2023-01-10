import React, { useState, useEffect } from 'react';

function StudentItem({student}) {
	const updateCheckbox = () => {
		console.log("a");
	};
	
	return (
		<div>
			<input type="checkbox" id="myCheck" onClick={updateCheckbox()} />
			<span>  {student.first_name} {student.last_name}</span>
		</div>
	);
}

export default StudentItem;