import esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';
const storage = localforage.createInstance({
	name: 'code_maker',
});
export const fetchPlugin = (inputCode: string) => ({
	name: 'fetchPlugin',
	setup: (build: esbuild.PluginBuild) => {
		build.onLoad({ filter: /(^index\.js$)/ }, async (args: any) => ({
			loader: 'jsx',
			contents: inputCode,
		}));
		//! if not return any value it move to next load
		build.onLoad({ filter: /.*/ }, async (args: any) => {
			const cachedResult = await storage.getItem<esbuild.OnLoadResult>(args.path);
			//! check to see whether the package is stored in IndexDb
			if (cachedResult) return cachedResult;
		});
		build.onLoad({ filter: /.css$/ }, async (args: any) => {
			const { data, request } = await axios.get(args.path);
			const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
			const contents = `
        const style = document.createElement('style');
        style.innerText = '${escaped}'
        document.head.appendChild(style)
        `;

			const result: esbuild.OnLoadResult = {
				loader: 'jsx',
				contents,
				resolveDir: new URL('.', request.responseURL).pathname,
			};
			await storage.setItem(args.path, result);

			return result;
		});
		build.onLoad({ filter: /.*/ }, async (args: any) => {
			const { data, request } = await axios.get(args.path);
			const result: esbuild.OnLoadResult = {
				loader: 'jsx',
				contents: data,
				resolveDir: new URL('.', request.responseURL).pathname,
			};
			await storage.setItem(args.path, result);

			return result;
		});
	},
});
