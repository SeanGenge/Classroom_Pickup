import React, {useState, useEffect} from 'react';
import Classroom from './components/Classroom';
import EditStudentCar from './components/EditStudentCar';
import { getStudentsTakingCar, resetAll } from './utils/api.js';

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
	// Used to retrieve the edit details for the modal
	const [updateEditDetails, setUpdateEditDetails] = useState(false);
	// Keeps a history record. Used to reset the db back to the default values
	const [historyCreatedChanges, setHistoryCreatedChanges] = useState([]);
	const [historyDeletedchanges, setHistoryDeletedChanges] = useState([]);
	// Set to true to update the studentsTakingCar data
	const [shouldUpdateStudentsTakingCar, setShouldUpdateStudentsTakingCar] = useState(false);
	
	useEffect(() => {
		// Run at the start of the app once, hardcoded classes
		setClasses(["A", "B"]);
	}, []);
	
	useEffect(() => {
		const fetchData = async () => {
			if (rego.length === 6 || (rego.length === 6 && shouldUpdateStudentsTakingCar)) {
				const studentsTakingCarData = await getStudentsTakingCar(rego, studentIdsWhoLeft);
				
				// Display an error if there is no data
				if (studentsTakingCarData.length) {
					setDisplayError(false);
				}
				else {
					setDisplayError(true);
				}
				
				setStudentsTakingCar(studentsTakingCarData);
				setShouldUpdateStudentsTakingCar(false);
			}
			else {
				setDisplayError(false);
			}
		};
		
		fetchData();
	}, [rego, setStudentsTakingCar, studentIdsWhoLeft, shouldUpdateStudentsTakingCar]);
	
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
	
	const resetState = () => {
		// Forces all the child components with a key set to currKey to unmount and remount, resetting them
		setCurrKey(currKey + 10);
		resetAll();
		setRego("");
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
			<div className="container mb-5">
				<div className="row justify-content-md-center mt-4">
					<div className="col-sm-12 col-md-4 mb-3">
						<input type="text" className="form-control" placeholder="registration number" id="registration_no" value={rego} onChange={(e) => setRego(e.target.value.toUpperCase())} />
						<div id="no-rego" className={`alert alert-danger mt-2 ${displayError ? 'display' : ''}`} role="alert">
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
			<EditStudentCar updateEditDetails={updateEditDetails} setUpdateEditDetails={setUpdateEditDetails} setShouldUpdateStudentsTakingCar={setShouldUpdateStudentsTakingCar} />
		</>
	);
}

export default App;
