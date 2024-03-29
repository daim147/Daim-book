import { Fragment, useEffect } from 'react';
import { useAction } from '../hooks/useAction';
import { useTypeSelector } from '../hooks/useTypedSelector';
import AddCell from './AddCell';
import CellItem from './CellItem';
import './cellList.css';
const CellList = () => {
	const cells = useTypeSelector((state) => {
		const { order, data } = state.cells!;
		return order.map((key) => data[key]);
	})!;
	const { fetchCells } = useAction();
	useEffect(() => {
		fetchCells();
	}, [fetchCells]);
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
