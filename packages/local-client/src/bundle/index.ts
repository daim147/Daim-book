/* eslint-disable import/no-anonymous-default-export */
import esbuild from 'esbuild-wasm';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-plugin';
let service: any;
export const initializeEsBuild = async () => {
	if (!service) {
		await esbuild.initialize({
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.30/esbuild.wasm',
			worker: true,
		});
	}
	service = esbuild;
};
export const build = async (rawCode: string) => {
	if (!service) {
		await initializeEsBuild();
	}
	try {
		const result = await service.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
			jsxFactory: '_React.createElement',
			jsxFragment: '_React.Fragment',
		});
		return { code: result.outputFiles[0].text as string, error: '' };
	} catch (e) {
		return { code: '', error: e as string };
	}
};
