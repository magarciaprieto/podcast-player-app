module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'standard',
    'eslint:recommended','plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    './node_modules/standard/eslintrc.json'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
