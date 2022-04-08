import React, { memo } from 'react';
import { Cell } from '../redux';
import ActionBar from './ActionBar';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import './cellItem.css';
const CellItem: React.FC<{ cell: Cell }> = ({ cell }) => {
	console.log('Renderinf');
	return (
		<div className='cell__item'>
			<ActionBar id={cell.id} wrap={cell.type === 'code' ? true : false} />
			{cell.type === 'code' ? <CodeCell cell={cell} /> : <TextEditor cell={cell} />}
		</div>
	);
};

export default memo(CellItem);
