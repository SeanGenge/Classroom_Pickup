import React, { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { getAllStudents, getStudentCar, getAllCars, bulkCreateStudentCar, bulkDeleteStudentCar } from '../utils/api.js';

function EditStudentCar({ updateEditDetails, setUpdateEditDetails, setShouldUpdateStudentsTakingCar }) {
	const [studentCar, setStudentCar] = useState([]);
	const [students, setStudents] = useState([]);
	const [cars, setCars] = useState([]);
	const [options, setOptions] = useState([]);
	const [selectedValues, setSelectedValues] = useState({});
	const [createChanges, setCreateChanges] = useState([]);
	const [deleteChanges, setDeleteChanges] = useState([]);
	
	useEffect(() => {
		const fetchData = async () => {
			setStudentCar(await getStudentCar());
			setStudents(await getAllStudents());
		};
		
		// Only run when the modal is open, basically resets everything to the values in the db
		if (updateEditDetails) {
			fetchData();
			setCreateChanges([]);
			setDeleteChanges([]);
			setUpdateEditDetails(false);
		}
	}, [setCreateChanges, setUpdateEditDetails, updateEditDetails]);
	
	useEffect(() => {
		const fetchData = async () => {
			setCars(await getAllCars());
		};
		
		// Only run once
		fetchData();
	}, []);
	
	useEffect(() => {
		// Convert students into a format that the multiselect can understand:
		// {name: 'name', id: 'id}
		const optionsArr = students.map(student => {return {'name': `${student.first_name} ${student.last_name}`, 'id': student.id}});
		
		// Convert and combine the optionsArr into an object
		setOptions(optionsArr);
		
		// Convert studentCar into a format that the multiselect can understand:
		// {name: 'name', id: 'id}
		const selectedValuesArr = studentCar.map(sc => [sc.car.registration, {'name': `${sc.student.first_name} ${sc.student.last_name}`, 'id': sc.student_id}]);
		let selectedValuesObj = {};
		
		// Convert and combine the selectedValuesArr into an object
		selectedValuesArr.forEach(item => {
			if (item[0] in selectedValuesObj) {
				selectedValuesObj[item[0]].push(item[1]);
			}
			else {
				selectedValuesObj[item[0]] = [item[1]];
			}
		});
		
		// To avoid a registration not having any students, add an empty list to those regos
		cars.forEach(car => {
			if (!(car.registration in selectedValuesObj)) {
				selectedValuesObj[car.registration] = [];
			}
		});
		
		// Not really needed but to keep the registrations in the same order, even if a rego doesn't have any students
		selectedValuesObj = Object.keys(selectedValuesObj).sort().reduce(
			(obj, key) => {
				obj[key] = selectedValuesObj[key];
				return obj;
			},
			{}
		);
		
		setSelectedValues(selectedValuesObj);
		
	}, [studentCar, students, cars]);
	
	const onSelect = (selectedList, selectedItem, key) => {
		// Requied so the multiList is reset when opening the modal
		setSelectedValues({...selectedValues, [key]: selectedList});
		
		// Get the car id
		const carId = cars.find(car => car.registration === key).id;
		const newChanges = [...createChanges, {"car_id": carId, "student_id": selectedItem.id}];
		
		setCreateChanges(newChanges);
	}
	
	const onRemove = (selectedList, removedItem, key) => {
		// Requied so the multiList is reset when opening the modal
		setSelectedValues({ ...selectedValues, [key]: selectedList });
		
		// Get the car id
		const carId = cars.find(car => car.registration === key).id;
		const newChanges = [...deleteChanges, { "car_id": carId, "student_id": removedItem.id }];

		setDeleteChanges(newChanges);
		
		// Check if the deleted changes are in the create changes, if they are then remove it from the create changes
		const isInCreateChanges = createChanges.findIndex(value => value.student_id === removedItem.id && value.car_id === carId);
		
		if (isInCreateChanges !== -1) {
			// Create a copy before modifying that
			const newCreateChanges = [...createChanges];
			newCreateChanges.splice(isInCreateChanges, 1);
			
			setCreateChanges(newCreateChanges);
		}
	};
	
	const saveData = async (e) => {
		bulkCreateStudentCar(createChanges);
		bulkDeleteStudentCar(deleteChanges);
		
		// Let the classes know to update themselves. Required to update any highlighted students
		setShouldUpdateStudentsTakingCar(true);
	}
	
	// Generate the multiselect options for each car registration
	const multiselects = Object.keys(selectedValues).map((key, id) => {
		return (
			<div key={id}>
				<label>{key}</label>
				<Multiselect
					options={options}
					selectedValues={selectedValues[key]}
					displayValue="name"
					id={`${key}`}
					onSelect={(selectedList, selectedItem) => onSelect(selectedList, selectedItem, key)}
					onRemove={(selectedList, removedItem) => onRemove(selectedList, removedItem, key)}
				/>
			</div>
		);
	});
	
	return (
		// Prevent the modal from being closed accidentally, you have to click on one of the buttons to close the modal
		<div className="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div className="modal-dialog modal-xl modal-fullscreen-md-down">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Students Pickups</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						{multiselects}
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
						<button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={saveData}>Save</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditStudentCar;