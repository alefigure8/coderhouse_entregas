import {program} from 'commander';

program
    .option('-m --mode <mode>', 'build mode', 'development')
    .option('-p --port <port>', 'server port', '8080')
    .parse(process.argv);

export const options = program.opts();