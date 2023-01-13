import React, {useState, useEffect} from 'react';
import Classroom from './components/Classroom';
import EditStudentRego from './components/EditStudentRego';

function App() {
	const [currKey, setCurrKey] = useState(0);
	// The data retrieved from the db for the StudentRego table
	const [studentRegoData, setStudentRegoData] = useState([]);
	// Keeps track of the student ids that have left
	const [studentIdsWhoLeft, setStudentIdsWhoLeft] = useState([]);
	// The binding for the input
	const [rego, setRego] = useState("");
	// true: Displays the registration error for the input
	const [displayError, setDisplayError] = useState(false);
	// As there are only two classes, hardcoded those values here. Can add to the db if you want to extend this app
	const [classes, setClasses] = useState([]);
	
	useEffect(() => {
		// Run at the start of the app
		const fetchData = async () => {
			setStudentRegoData(await fetchStudentRego());
		}
		
		fetchData();
		setClasses(["A", "B"]);
	}, []);
	
	const fetchStudentRego = async () => {
		// Get the student rego data from the back-end and return the result
		return await fetch("/api/studentrego/")
			.then(response => response.json());
	};
	
	const addOrRemoveStudent = (studentId, remove) => {
		// Handle the removal/adding back of students when the checkbox is ticked/unticked
		// remove: Set to true to remove a student and false to add
		if (remove) {
			setStudentIdsWhoLeft(studentIdsWhoLeft.concat(studentId));
		}
		else {
			setStudentIdsWhoLeft(studentIdsWhoLeft.filter(sid => sid !== studentId));
		}
	};
	
	const isCarTakingStudent = (studentId, rego) => {
		// Returns true if the car is picking up the student (if the student hasn't already been picked up already) and false otherwise
		const isStudentAlreadyPickedUp = studentIdsWhoLeft.find(sid => sid === studentId);
		
		return !isStudentAlreadyPickedUp && studentRegoData.filter(sr => sr.student_id === studentId && sr.registration.registration === rego).length;
	}
	
	const isCarTakingAnyStudents = (rego) => {
		// Returns true if the car is taking any students at all and false otherwise
		return studentRegoData.filter(sr => sr.registration.registration === rego).length;
	}
	
	const checkRego = async (e) => {
		// The value of the typed registration
		const value = e.target.value.toUpperCase();
		
		setRego(value);
		
		if (value.length === 6 && !isCarTakingAnyStudents(value)) {
			setDisplayError(true);
		}
		else {
			setDisplayError(false);
		}
	};
	
	const resetState = () => {
		// Forces all the child components with a key set to currKey to unmount and remount, resetting them
		setCurrKey(currKey + 10);
	};
	
	const classrooms = classes.map((c, id) => {
		return (
			<div className="col-sm-12 col-md-5 col-lg-4" key={id + currKey}>
				<Classroom classroom_no={c} rego={rego} studentRego={studentRegoData} addOrRemoveStudent={addOrRemoveStudent} studentIdsWhoLeft={studentIdsWhoLeft} />
			</div>
		);
	});
	
	return (
		<>
			<div className="container">
				<div className="row justify-content-md-center mt-4">
					<div className="col-sm-12 col-md-4">
						<input type="text" className="form-control" placeholder="registration number" id="registration_no" value={rego} onChange={(e) => checkRego(e)} />
						<div id="no-rego" className={`alert alert-danger mt-2 ${displayError ? '' : 'd-none'}`} role="alert">
							Sorry, there are no students for that Registration number
						</div>
					</div>
					<div className="col-sm-12 col-md-3">
						<button className="btn btn-primary" onClick={resetState}>Reset Everything</button>
					</div>
					<div className="col-sm-12 col-md-3">
						<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fa-solid fa-pen-to-square"></i></button>
					</div>
				</div>
				<div className="row justify-content-md-center">
					{classrooms}
				</div>
			</div>
			<EditStudentRego studentRego={studentRegoData} />
		</>
	);
}

export default App;
