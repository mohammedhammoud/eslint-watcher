import { ChildProcess, spawn } from 'child_process';
import path from 'path';

type LintOptions = {
  args: (number | string)[];
  files?: string[];
};

export const lint = ({ args: argv, files = [] }: LintOptions) => {
  const stringArgs = [...files, ...argv, '--exit-on-fatal-error'].map((arg) =>
    arg.toString()
  );

  const eslint: ChildProcess = spawn(
    path.join(process.cwd(), 'node_modules', '.bin', 'eslint'),
    stringArgs,
    { stdio: 'inherit' }
  );

  eslint.on('close', (code) => {
    if (code === 2) {
      console.log(`ESLint process exited with code ${code}`);
    }
  });
};
