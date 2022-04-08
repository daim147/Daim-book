import { Command } from 'commander';

export default new Command()
	.name('serve')
	.description('Getting Reading to Serve File')
	.action(() => {
		console.log('HEllo world');
	});
