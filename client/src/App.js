import React, {useState, useEffect} from 'react';

function App() {
	useEffect(() => {
		const fetchData = async () => {
			await fetch("/api/test")
			.then(response => response.json())
			.then(result => console.log(result));
		};
		
		fetchData();
	}, []);
	
	return (
		<div>Test</div>
	);
}

export default App;
