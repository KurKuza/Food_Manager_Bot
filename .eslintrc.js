const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json'),
    tsconfigRootDir: '.',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    curly: ['error'],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        overrides: {
          constructors: 'no-public',
        },
      },
    ],
    '@typescript-eslint/semi': ['error'],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
        checksConditionals: false,
      },
    ],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/no-floating-promises': ['warn'],
    '@typescript-eslint/no-unsafe-assignment': ['warn'],
    '@typescript-eslint/no-unsafe-member-access': ['warn'],
    '@typescript-eslint/no-unsafe-return': ['warn'],
    '@typescript-eslint/no-unsafe-call': ['warn'],
    '@typescript-eslint/restrict-template-expressions': ['warn'],
    '@typescript-eslint/ban-types': ['warn'],
    '@typescript-eslint/require-await': ['warn'],
    '@typescript-eslint/restrict-plus-operands': ['warn'],
    '@typescript-eslint/no-unused-vars': ['error'],
    complexity: ['error', 5],
  },
};
