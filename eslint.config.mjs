import js from '@eslint/js';
import jest from 'eslint-plugin-jest';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
  { files: ['**/*.{ts,js,mjs}'] },
  { languageOptions: { globals: globals.node } },
  { ignores: ['.history/', 'node_modules/', 'dist/', 'bin/'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    extends: [{ plugins: { 'unused-imports': unusedImports } }],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'func-style': ['error', 'expression'],
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  jest.configs['flat/recommended'],
  perfectionist.configs['recommended-alphabetical'],
  prettier
);
