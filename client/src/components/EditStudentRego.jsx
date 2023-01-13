import React, { useState, useEffect } from 'react';

function EditStudentRego({ currStudentId, studentRego }) {
	const [currStudentRego, setCurrStudentRego] = useState([]);
	const [currStudent, setCurrStudent] = useState({});
	
	useEffect(() => {
		if (studentRego?.length) {
			const currSR = studentRego.filter(sr => sr.student_id === currStudentId);
			
			if (currSR.length) {
				setCurrStudent(currSR[0].student);
				setCurrStudentRego(currSR);
				console.log(currSR);
			}
		}
	}, [studentRego, currStudentId]);
	
	return (
		// Prevent the modal from being closed accidentally, you have to click on one of the buttons to close the modal
		<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="staticBackdropLabel">{`${currStudent.first_name} ${currStudent.last_name}`}</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						...
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
						<button type="button" className="btn btn-primary">Save</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditStudentRego;