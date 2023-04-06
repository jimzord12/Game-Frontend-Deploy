module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 'airbnb',
    'plugin:react/jsx-runtime',
    'prettier',
    'plugin:react/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react-in-jsx-scope': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
