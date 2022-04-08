import CodeEditor from './CodeEditor';
import './codeCell.css';
import Preview from './Preview';
import Resizable from './Resizable';
import { useEffect, useRef } from 'react';
import { Cell } from '../redux';
import { useAction } from '../hooks/useAction';
import { useTypeSelector } from '../hooks/useTypedSelector';
import { useCumulativeCode } from '../hooks/useComulativecode';
const CodeCell: React.FC<{ cell: Cell }> = ({ cell: { id, content } }) => {
	const result = useTypeSelector((state) => state.bundle?.[id]);
	const cumulativeCode = useCumulativeCode(id);
	const { updateCell, createBundle } = useAction();
	const timerPossible = useRef<boolean>(false);
	useEffect(() => {
		if (!timerPossible.current) {
			createBundle(id, cumulativeCode!);
			timerPossible.current = true;
			return;
		}
		const timer = setTimeout(async () => {
			createBundle(id, cumulativeCode!);
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [cumulativeCode, createBundle, id]);
	console.log(result, id);
	return (
		<Resizable direction='vertical'>
			<div style={{ display: 'flex', width: '100%', height: 'calc(100% - 10px)' }}>
				<Resizable direction='horizontal'>
					<CodeEditor onChange={(value) => updateCell(id, value)} value={content} />
				</Resizable>
				<div className={'progress-wrapper'}>
					{!result || result.loading ? (
						<div className='progress-cover'>
							{console.log('here')}
							<progress className='progress is-small is-primary' max={'100'}>
								Loading
							</progress>
						</div>
					) : (
						<Preview code={result.code} error={result.error} />
					)}
				</div>
			</div>
		</Resizable>
	);
};

export default CodeCell;
