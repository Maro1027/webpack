module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    jquery: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'prefer-const': 'error',
  },
};
