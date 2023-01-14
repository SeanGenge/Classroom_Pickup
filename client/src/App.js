import React, {useState, useEffect, useCallback} from 'react';
import Classroom from './components/Classroom';
import EditStudentCar from './components/EditStudentCar';
import { getStudentsTakingCar } from './utils/api.js';

function App() {
	const [currKey, setCurrKey] = useState(0);
	// The data retrieved from the db for the studentCar table
	const [studentsTakingCar, setStudentsTakingCar] = useState([]);
	// Keeps track of the student ids that have left
	const [studentIdsWhoLeft, setStudentIdsWhoLeft] = useState([]);
	// The binding for the input
	const [rego, setRego] = useState("");
	// true: Displays the registration error for the input
	const [displayError, setDisplayError] = useState(false);
	// As there are only two classes, hardcoded those values here. Can add to the db if you want to extend this app
	const [classes, setClasses] = useState([]);
	// Used to retriev the edit details for the modal
	const [updateEditDetails, setUpdateEditDetails] = useState(false);
	
	useEffect(() => {
		// Run at the start of the app once
		setClasses(["A", "B"]);
	}, []);
	
	useEffect(() => {
		const fetchData = async () => {
			if (rego.length) {
				const studentsTakingCarData = await getStudentsTakingCar(rego, studentIdsWhoLeft);
				console.log(studentsTakingCarData);
				setStudentsTakingCar(studentsTakingCarData);
			}
		};
		
		fetchData();
	}, [rego, setStudentsTakingCar, studentIdsWhoLeft]);
	
	const addOrRemoveStudent = async (studentId, remove) => {
		// Handle the removal/adding back of students when the checkbox is ticked/unticked
		// remove: Set to true to remove a student and false to add
		if (remove) {
			setStudentIdsWhoLeft(studentIdsWhoLeft.concat(studentId));
		}
		else {
			const newStudentIdsWhoLeft = studentIdsWhoLeft.filter(sid => sid !== studentId);
			setStudentIdsWhoLeft(newStudentIdsWhoLeft);
			
			// Update the students taking the car with that rego when adding students back
			getStudentsTakingCar(newStudentIdsWhoLeft);
		}
	};
	
	const checkRego = async (e) => {
		// The value of the typed registration
		const value = e.target.value.toUpperCase();
		
		setRego(value);
		
		if (value.length === 6) {
			//const studentsTakingCarData = await getStudentsTakingCar(value, studentIdsWhoLeft);
			
			//setStudentsTakingCar(studentsTakingCarData);
			
			// if (!studentsTakingCarData.length) {
			// 	setDisplayError(true);
			// }
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
				<Classroom classroom_no={c} rego={rego} studentCar={studentsTakingCar} addOrRemoveStudent={addOrRemoveStudent} studentIdsWhoLeft={studentIdsWhoLeft} />
			</div>
		);
	});
	
	return (
		<>
			<div className="container">
				<div className="row justify-content-md-center mt-4">
					<div className="col-sm-12 col-md-4 mb-3">
						<input type="text" className="form-control" placeholder="registration number" id="registration_no" value={rego} onChange={(e) => checkRego(e)} />
						<div id="no-rego" className={`alert alert-danger mt-2 ${displayError ? '' : 'd-none'}`} role="alert">
							Sorry, there are no students for that Registration number
						</div>
					</div>
					<div className="col-sm-12 col-md-5 mb-4">
						<button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" onClick={(e) => setUpdateEditDetails(true)}>Edit Students Pickups</button>
						<button className="btn btn-danger ms-2" onClick={resetState}>Reset Everything</button>
					</div>
				</div>
				<div className="row justify-content-md-center">
					{classrooms}
				</div>
			</div>
			<EditStudentCar updateEditDetails={updateEditDetails} setUpdateEditDetails={setUpdateEditDetails} />
		</>
	);
}

export default App;
