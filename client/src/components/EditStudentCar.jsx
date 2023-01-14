import React, { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { getAllStudents, getStudentCar } from '../utils/api.js';

function EditStudentCar({ updateEditDetails, setUpdateEditDetails }) {
	const [studentCar, setStudentCar] = useState([]);
	const [students, setStudents] = useState([]);
	const [options, setOptions] = useState([]);
	const [selectedValues, setSelectedValues] = useState({});
	const [modifiedChanges, setModifiedChanges] = useState({});
	
	useEffect(() => {
		const fetchData = async () => {
			setStudentCar(await getStudentCar());
			setStudents(await getAllStudents());
		};
		
		if (updateEditDetails) {
			fetchData();
			setUpdateEditDetails(false);
		}
	});
	
	useEffect(() => {
		// Convert students into a format that the multiselect can understand:
		// {name: 'name', id: 'id}
		const optionsArr = students.map(student => { return {'name': `${student.first_name} ${student.last_name}`, 'id': student.id }});
		
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
		
		setSelectedValues(selectedValuesObj);
		
	}, [studentCar, students]);
	
	const onSelect = (selectedList, selectedItem, key) => {
		const newKeyList = [...selectedValues[key], selectedItem];
		
		setSelectedValues({...selectedValues, [key]: newKeyList});
	}
	
	const onRemove = (selectedList, removedItem, key) => {
		const removedItemId = selectedValues[key].findIndex(item => item.id === removedItem.id);
		const newKeyList = [...selectedValues[key]];
		
		newKeyList.splice(removedItemId, 1);

		setSelectedValues({ ...selectedValues, [key]: newKeyList });
	};
	
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
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
						<button type="button" className="btn btn-primary">Save</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditStudentCar;