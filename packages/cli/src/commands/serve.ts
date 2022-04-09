import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';
const isProduction = process.env.NODE_ENV === 'production';
export default new Command()
	.command('serve [filename]')
	.description('Getting Reading to Serve File')
	.option('-p, --port <number>', 'port to run server', '4005')
	.action(async (filename = 'notebook.js', options: { port: string }) => {
		const dir = path.join(process.cwd(), path.dirname(filename));
		filename = path.basename(filename);
		try {
			await serve(parseInt(options.port), filename, dir, !isProduction);
			console.log(`  Server is running navigate to https://localhost:${options.port}
			`);
		} catch (error: any) {
			if (error.code === 'EADDRINUSE') {
				console.error(
					`Try to run on different port except ${options.port} --port {port number} `
				);
			}
			console.error('Here is the problem', error.message);
		}
	});
