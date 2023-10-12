/**
 * Author: Mattias Ghodsian
 * License: MIT
 * Repo: https://github.com/mattiasghodsian/gitlab-time-reporter
 * Donate: https://www.buymeacoffee.com/mattiasghodsian
 */
import commander from 'commander';

export default {
    commandLine() {
        commander
            .version('1.0.0', '-v, --version')
            .usage('[OPTIONS]...')
            .option('-s, --state <value>', 'The state of each issue, e.g., opened, closed', 'closed')
            .option('-a, --after <value>', 'Get issues after date (2023-10-01)')
            .option('-b, --before <value>', 'Get issues before date  (2023-10-31)')
            .parse(process.argv);

        const options   = commander.opts();
        const state     = options.state;
        const after     = options.after ? options.after : false;
        const before    = options.before ? options.before : false;

        return { state, after, before };
    }
}