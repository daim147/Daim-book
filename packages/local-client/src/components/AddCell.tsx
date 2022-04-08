import { useAction } from '../hooks/useAction';
import './addCell.css';

interface AddCellProps {
	nextCellId: string | null;
	forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, nextCellId }) => {
	const { insertCellBefore } = useAction();

	return (
		<div className={`add-cell ${forceVisible && 'force-visible'}`}>
			<div className='add-buttons'>
				<button
					className='button is-rounded is-primary is-small'
					onClick={() => insertCellBefore(nextCellId, 'code')}
				>
					<span className='icon is-small'>
						<i className='fas fa-plus' />
					</span>
					<span>Code</span>
				</button>
				<button
					className='button is-rounded is-primary is-small'
					onClick={() => insertCellBefore(nextCellId, 'text')}
				>
					<span className='icon is-small'>
						<i className='fas fa-plus' />
					</span>
					<span>Text</span>
				</button>
			</div>
			<div className='divider'></div>
		</div>
	);
};

export default AddCell;
