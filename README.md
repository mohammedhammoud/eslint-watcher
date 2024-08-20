# watch-eslint

`watch-eslint` is a tool that automatically runs ESLint whenever it detects changes in your files. It works with any version of ESLint, as long as it's installed in your repository, allowing you to upgrade or downgrade ESLint without compatibility issues.

## Getting Started

### Installation

To install ESLint and `watch-eslint`, use one of the following commands:

```sh
yarn add eslint watch-eslint --dev
```

or

```sh
npm install eslint watch-eslint --dev
```

## How to Use

### Running the Watcher

To start the ESLint watcher, use the following command:

```sh
yarn watch-eslint
```

This command will watch your files and automatically run ESLint when changes are detected.

### Viewing Options

To see all available options for `watch-eslint`, use the `--help` flag:

```sh
yarn watch-eslint --help
```

This will display a list of all available options and their descriptions.

## Techniques Used

- **File Watching**: Uses `chokidar` to monitor file changes and trigger ESLint runs.
- **Debouncing**: Utilizes `lodash.debounce` to prevent multiple rapid triggers of ESLint.
- **Child Processes**: Executes ESLint as a child process using Node.js's `child_process.spawn`.
