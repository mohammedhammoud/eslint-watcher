import chokidar from 'chokidar';
import debounce from 'lodash.debounce';

import { getArgv } from './argv';
import { lint } from './lint';

export const watch = async () => {
  const { argv } = await getArgv();
  lint({ args: argv._ });

  const changedFiles = new Set<string>();

  const run = debounce((files: Set<string>) => {
    lint({ args: argv._, files: Array.from(files) });
    changedFiles.clear();
  }, argv.watcherDelay);

  console.log('Watching files for changes...');

  chokidar
    .watch('**/*', {
      ignored: argv.watcherIgnores,
      ignoreInitial: true,
    })
    .on('all', (event, filePath) => {
      if (event === 'change') {
        changedFiles.add(filePath);
        run(changedFiles);
      }
    });
};
