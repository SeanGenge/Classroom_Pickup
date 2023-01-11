import React, {useState, useEffect} from 'react';
import Classroom from './components/Classroom';

function App() {
	const [currKey, setCurrKey] = useState(0);
	const [studentRego, setStudentRego] = useState([]);
	const [rego, setRego] = useState("");
	
	useEffect(() => {
		const fetchData = async () => {
			await fetch("/api/studentrego/")
			.then(response => response.json())
			.then(result => setStudentRego(result));
		};
		
		fetchData();
	}, []);
	
	const resetState = () => {
		// Forces all the child components with a key set to currKey to unmount and remount, resetting them
		setCurrKey(currKey + 10);
	};
	
	return (
		<>
			<button onClick={resetState}>Reset</button>
			<input type="text" id="registration_no" value={rego} onChange={(e) => setRego(e.target.value.toUpperCase())} />
			<Classroom classroom_no="A" rego={rego} studentRego={studentRego} key={currKey} />
			<Classroom classroom_no="B" rego={rego} studentRego={studentRego} key={currKey + 1} />
		</>
	);
}

export default App;
