import serve from './commands/serve';
import { program } from 'commander';
program.addCommand(serve);
program.parse(process.argv);
