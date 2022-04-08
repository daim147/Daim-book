import React, { useEffect, useRef } from 'react';
import { html } from '../iframe';
import './preview.css';
interface PreviewProps {
	code: string;
	error: string;
}
const Preview: React.FC<PreviewProps> = ({ code, error }) => {
	const iframe = useRef<any>(null);
	useEffect(() => {
		iframe.current.srcDocs = html;
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);
	return (
		<div className='preview-wrapper'>
			<iframe title='preview' ref={iframe} sandbox='allow-scripts' srcDoc={html}></iframe>
			{error && <div className='preview-error'>{error.toString()}</div>}
		</div>
	);
};

export default Preview;
