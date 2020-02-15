module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'import/prefer-default-export': 'off',
    'react/prefer-stateless-function': 'off',
    'no-param-reassign': 'off',
    'no-console': ['error', { allow: ['tron'] }]
  },
};
