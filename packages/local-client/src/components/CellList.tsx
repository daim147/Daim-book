import { Fragment } from 'react';
import { useTypeSelector } from '../hooks/useTypedSelector';
import AddCell from './AddCell';
import CellItem from './CellItem';
import './cellList.css';
const CellList = () => {
	const cells = useTypeSelector((state) => {
		const { order, data } = state.cells!;
		return order.map((key) => data[key]);
	})!;
	return (
		<div className='cell-list'>
			<AddCell nextCellId={null} forceVisible={true} />
			{cells.map((cell) => (
				<Fragment key={cell.id}>
					<CellItem cell={cell} />
					<AddCell nextCellId={cell.id} />
				</Fragment>
			))}
		</div>
	);
};

export default CellList;
