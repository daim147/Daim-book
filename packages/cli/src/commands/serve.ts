import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';
export default new Command()
	.command('serve [filename]')
	.description('Getting Reading to Serve File')
	.option('-p, --port <number>', 'port to run server', '4005')
	.action((filename = 'notebook.js', options: { port: string }) => {
		const dir = path.join(process.cwd(), path.dirname(filename));
		filename = path.basename(filename);
		console.log(options);
		serve(parseInt(options.port), filename, dir);
	});
