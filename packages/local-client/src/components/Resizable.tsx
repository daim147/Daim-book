import React, { useState } from 'react';
import { useEffect } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';
interface Props {
	direction: 'vertical' | 'horizontal';
}
const Resizable: React.FC<Props> = ({ direction, children }) => {
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [width, setWidth] = useState(window.innerWidth * 0.75);

	useEffect(() => {
		let timer: any = undefined;
		const resizer = () => {
			timer && clearTimeout(timer);
			timer = setTimeout(() => {
				setInnerHeight(window.innerHeight);
				setInnerWidth(window.innerWidth);
				if (window.innerWidth * 0.75 < width) {
					setWidth(window.innerWidth * 0.75);
				}
			}, 200);
		};
		window.addEventListener('resize', resizer);
		return () => window.removeEventListener('resize', resizer);
	}, [width]);
	let resizableBoxProps: ResizableBoxProps;
	if (direction === 'horizontal') {
		resizableBoxProps = {
			width,
			className: 'horizontal-resizable',
			height: Infinity,
			maxConstraints: [innerWidth * 0.75, Infinity],
			minConstraints: [innerWidth * 0.2, Infinity],
			resizeHandles: ['e'],
			onResizeStop: (_, data) => {
				setWidth(data.size.width);
			},
		};
	} else {
		resizableBoxProps = {
			width: Infinity,
			height: 300,
			maxConstraints: [Infinity, innerHeight * 0.9],
			minConstraints: [Infinity, 35],
			resizeHandles: ['s'],
		};
	}
	return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
