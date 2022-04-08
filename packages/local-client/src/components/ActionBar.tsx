import React from 'react';
import { useAction } from '../hooks/useAction';
import './actionBar.css';
const ActionBar: React.FC<{ id: string; wrap: boolean }> = ({ id, wrap }) => {
	const { deleteCell, moveCell } = useAction();
	return (
		<div className={`action_bar ${wrap && 'action_bar_wrap'}`}>
			<button className='button is-primary is-small' onClick={() => moveCell(id, 'up')}>
				<span className='icon'>
					<i className='fas fa-arrow-up'></i>
				</span>
			</button>
			<button className='button is-primary is-small' onClick={() => moveCell(id, 'down')}>
				<span className='icon'>
					<i className='fas fa-arrow-down'></i>
				</span>
			</button>
			<button className='button is-primary is-small' onClick={() => deleteCell(id)}>
				<span className='icon'>
					<i className='fas fa-times'></i>
				</span>
			</button>
		</div>
		// {wrap && </div>}
	);
};

export default ActionBar;
