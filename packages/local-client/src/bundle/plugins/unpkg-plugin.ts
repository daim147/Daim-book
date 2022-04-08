import esbuild from 'esbuild-wasm';
let unpkg = 'https://unpkg.com';
export const unpkgPathPlugin = () => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			//! Handle root file
			build.onResolve({ filter: /(^index\.js$)/ }, () => ({ path: 'index.js', namespace: 'a' }));
			//! Handle relative path in module
			build.onResolve({ filter: /^\.+\// }, (args) => ({
				path: new URL(args.path, unpkg + args.resolveDir + '/').href,
				namespace: 'a',
			}));
			//! Handle main file in module
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					path: new URL(args.path, unpkg).href,
					namespace: 'a',
				};
			});
		},
	};
};
