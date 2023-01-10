import React, {useState, useEffect} from 'react';
import Classroom from './components/Classroom';

function App() {
	const [currKey, setCurrKey] = useState(0);
	
	const resetState = () => {
		// Forces all the child components with a key set to currKey to unmount and remount, resetting them
		setCurrKey(currKey + 10);
	};
	
	return (
		<>
			<button onClick={resetState}>Reset</button>
			<Classroom classroom_no="A" key={currKey} />
			<Classroom classroom_no="B" key={currKey + 1} />
		</>
	);
}

export default App;
