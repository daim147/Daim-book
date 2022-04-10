import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { creatCellRouter } from './router';
const app = express();

export const serve = (
	port: number,
	fileName: string,
	dir: string,
	useProxy: boolean
) => {
	app.use(creatCellRouter(fileName, dir));
	if (useProxy) {
		app.use(
			createProxyMiddleware({
				target: 'http://localhost:3000',
				ws: true,
				logLevel: 'silent',
			})
		);
	} else {
		const packagePath = require.resolve(
			'@daim-book/local-client/build/index.html'
		);
		app.use(express.static(path.dirname(packagePath)));
	}
	return new Promise((resolve, reject) => {
		app.listen(port, resolve as () => void).on('error', reject);
	});
};
