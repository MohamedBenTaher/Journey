module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb',"plugin:react/jsx-runtime"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', 'react'],
  rules: {
    'prettier/prettier': 2,
    'no-underscore-dangle': 'off',
    'comma-dangle': [2, 'always-multiline'],
  },
};
