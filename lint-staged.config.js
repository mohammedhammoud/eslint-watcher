module.exports = {
  '*.{ts,js,mjs}': (filenames) => {
    const files = filenames.join(' ');
    const commands = [`yarn eslint --cache ${files} --fix`];
    return commands;
  },
  '*.md': (filenames) => `prettier --write ${filenames.join(' ')}`,
};
