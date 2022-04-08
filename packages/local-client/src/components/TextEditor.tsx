import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useAction } from '../hooks/useAction';
import { Cell } from '../redux';
import './textEditor.css';
const TextEditor: React.FC<{ cell: Cell }> = ({ cell }) => {
	const [editing, setEditing] = useState(false);
	const { updateCell } = useAction();
	useEffect(() => {
		const listener = () => {
			setEditing(false);
		};
		window.addEventListener('click', listener);

		return () => window.removeEventListener('click', listener);
	});
	const value = cell.content.trim().length ? cell.content : '# Click to edit';
	return (
		<div
			onClick={(e) => {
				e.stopPropagation();
				setEditing(true);
			}}
			className='text-editor'
		>
			{editing && <MDEditor value={value} onChange={(val) => updateCell(cell.id, val || '')} />}
			{!editing && (
				<div className='card'>
					<div className='card-content'>
						<MDEditor.Markdown source={value} />
					</div>
				</div>
			)}
		</div>
	);
};

export default TextEditor;
