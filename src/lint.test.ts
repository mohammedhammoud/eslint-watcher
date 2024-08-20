import * as child_process from 'child_process';

import { lint } from './lint';

jest.mock('child_process');

describe('lint', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should use process.cwd() to find the eslint binary', () => {
    jest.spyOn(process, 'cwd').mockReturnValue('/path');
    const spawnMock = jest
      .spyOn(child_process, 'spawn')
      .mockImplementation(() => {
        return {
          on: jest.fn(),
        } as unknown as child_process.ChildProcess;
      });

    lint({ args: [], files: [] });

    expect(spawnMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/path\/node_modules\/\.bin\/eslint/),
      expect.any(Array),
      expect.any(Object)
    );
  });

  it('should log a message if eslint process exists with a fatal error', () => {
    const consoleLogMock = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    const spawnMock = jest
      .spyOn(child_process, 'spawn')
      .mockImplementation(() => {
        const eslintProcess = {
          on: jest.fn((event, callback) => {
            if (event === 'close') {
              callback(2);
            }
          }),
        };
        return eslintProcess as unknown as child_process.ChildProcess;
      });

    lint({ args: [], files: [] });

    expect(spawnMock).toHaveBeenCalled();
    expect(consoleLogMock).toHaveBeenCalledWith(
      'ESLint process exited with code 2'
    );
  });
});
