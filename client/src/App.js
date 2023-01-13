import React, {useState, useEffect} from 'react';
import Classroom from './components/Classroom';
import EditStudentRego from './components/EditStudentRego';

function App() {
	const [currKey, setCurrKey] = useState(0);
	// Keeps track of the students and the registrations attached to that student
	const [studentRego, setStudentRego] = useState([]);
	const [rego, setRego] = useState("");
	// Used to keep a copy of the removed students. This is required so you are able to 
	const [removedStudentRego, setRemovedStudentRego] = useState([]);
	// true: Displays the registration error for the input
	const [displayError, setDisplayError] = useState(false);
	// The currently selected student for editing
	const [currStudentId, setCurrStudentId] = useState(0);
	
	useEffect(() => {
		const fetchData = async () => {
			await fetch("/api/studentrego/")
			.then(response => response.json())
			.then(result => setStudentRego(result));
		};
		
		fetchData();
	}, []);
	
	const handleStudentRegoUpdate = (studentId, remove) => {
		// Handle the removal/adding back of students when the checkbox is ticked/unticked
		if (remove) {
			// Adds the student you want to remove to a separate array. Used to add the student back if you untick
			setRemovedStudentRego(removedStudentRego.concat(studentRego.filter(sr => sr.student_id === studentId)));
			// Remove the student
			setStudentRego(studentRego.filter(sr => sr.student_id !== studentId));
		}
		else {
			setStudentRego(studentRego.concat(removedStudentRego.filter(sr => sr.student_id === studentId)));
		}
	};
	
	const checkRego = (e) => {
		const value = e.target.value.toUpperCase();
		
		// If the rego is 6 characters long and is not found in the studentRego list then all students must have been ticked off
		if (value.length === 6 && studentRego.filter(sr => sr.registration.registration === value).length === 0) {
			// Display an error message
			setDisplayError(true);
		}
		else {
			setDisplayError(false);
		}
		
		// Update the rego state
		setRego(value);
	};
	
	const resetState = () => {
		// Forces all the child components with a key set to currKey to unmount and remount, resetting them
		setCurrKey(currKey + 10);
	};
	
	return (
		<>
			<div className="container">
				<div className="row justify-content-md-center mt-4">
					<div className="col-sm-12 col-md-4">
						<input type="text" className="form-control" id="registration_no" value={rego} onChange={(e) => checkRego(e)} />
						<div id="no-rego" className={`alert alert-danger mt-2 ${displayError ? '' : 'd-none'}`} role="alert">
							Sorry, there are no students for that Registration number
						</div>
					</div>
					<div className="col-sm-12 col-md-3">
						<button className="btn btn-primary" onClick={resetState}>Reset Everything</button>
					</div>
				</div>
				<div className="row justify-content-md-center">
					<div className="col-sm-12 col-md-5 col-lg-4">
						<Classroom classroom_no="A" rego={rego} studentRego={studentRego} handleStudentRegoUpdate={handleStudentRegoUpdate} setCurrStudentId={setCurrStudentId} key={currKey} />
					</div>
					<div className="col-sm-12 col-md-5 col-lg-4">
						<Classroom classroom_no="B" rego={rego} studentRego={studentRego} handleStudentRegoUpdate={handleStudentRegoUpdate} setCurrStudentId={setCurrStudentId} key={currKey + 1} />
					</div>
				</div>
			</div>
			<EditStudentRego currStudentId={currStudentId} studentRego={studentRego} />
		</>
	);
}

export default App;
