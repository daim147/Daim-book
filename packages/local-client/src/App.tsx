import { useEffect } from 'react';
import { initializeEsBuild } from './bundle';
import CellList from './components/CellList';

function App() {
	useEffect(() => {
		initializeEsBuild();
	}, []);
	return (
		<div>
			<CellList />
		</div>
	);
}

export default App;
